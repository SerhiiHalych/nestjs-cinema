import { Inject, Injectable, Scope } from '@nestjs/common';
import * as _ from 'lodash';

import {
  GetMovieSessionQueryInput,
  GetMovieSessionQueryOutput,
  IGetMovieSessionQuery,
} from './IGetMovieSessionQuery';
import { Query } from '../../../../common/application/Query';
import { ServiceToken } from '../../../../common/diTokens';
import { IMovieProvider } from '../../services/IMovieProvider';

@Injectable({ scope: Scope.REQUEST })
export class GetMovieSessionQuery
  extends Query<GetMovieSessionQueryInput, GetMovieSessionQueryOutput>
  implements IGetMovieSessionQuery
{
  constructor(
    @Inject(ServiceToken.MOVIE_PROVIDER)
    private readonly _movieProvider: IMovieProvider,
  ) {
    super();
  }

  protected async implementation(): Promise<GetMovieSessionQueryOutput> {
    const { id } = this._input;

    const movieSession =
      await this._dbContext.movieSessionRepository.findById(id);

    if (!movieSession) {
      return {
        movieSession: null,
      };
    }

    const movieInfo = await this._movieProvider.getMovieInfo(
      movieSession.movieId,
    );

    if (!movieInfo) {
      // non-trivial case. Should be logged

      return {
        movieSession: null,
      };
    }

    const cinemaHall = await this._dbContext.cinemaHallRepository.findById(
      movieSession.cinemaHallId,
    );

    if (!cinemaHall) {
      // non-trivial case. Should be logged

      return {
        movieSession: null,
      };
    }

    const tickets =
      await this._dbContext.ticketRepository.listByMovieSessionId(id);

    const ticketsHashMap = _.keyBy(tickets, (ticket) => ticket.seatNumber);

    return {
      movieSession: {
        id,
        movieName: movieInfo.name,
        thumbnailUrl: movieInfo.thumbnailUrl,
        endTime: movieSession.endTime,
        startTime: movieSession.startTime,
        cinemaHallNumber: cinemaHall.cinemaHallNumber,
        status: movieSession.status,
        seats: cinemaHall.seats.map((seat) => {
          const ticket = ticketsHashMap[seat.seatNumber];

          return {
            ticketId: ticket?.ticketId ?? null,
            seatNumber: seat.seatNumber,
            price: ticket?.price ?? null,
            isAvailable:
              ticket !== undefined ? ticket.visitorId === null : false,
          };
        }),
      },
    };
  }
}
