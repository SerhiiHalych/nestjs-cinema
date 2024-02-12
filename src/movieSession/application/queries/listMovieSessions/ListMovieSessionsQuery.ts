import { Inject, Injectable, Scope } from '@nestjs/common';
import * as _ from 'lodash';

import {
  ListMovieSessionsQueryInput,
  ListMovieSessionsQueryOutput,
  IListMovieSessionsQuery,
} from './IListMovieSessionsQuery';
import { Query } from '../../../../common/application/Query';
import { ServiceToken } from '../../../../common/diTokens';
import { IMovieProvider } from '../../services/IMovieProvider';

@Injectable({ scope: Scope.REQUEST })
export class ListMovieSessionsQuery
  extends Query<ListMovieSessionsQueryInput, ListMovieSessionsQueryOutput>
  implements IListMovieSessionsQuery
{
  constructor(
    @Inject(ServiceToken.MOVIE_PROVIDER)
    private readonly _movieProvider: IMovieProvider,
  ) {
    super();
  }

  protected async implementation(): Promise<ListMovieSessionsQueryOutput> {
    const { movieId } = this._input;

    const movieSessions = await this._dbContext.movieSessionRepository.list({
      movieId,
    });

    if (movieSessions.length === 0) {
      return {
        movieSessions: [],
      };
    }

    const moviesInfo = await Promise.all(
      movieSessions.map(({ movieId }) =>
        this._movieProvider.getMovieInfo(movieId),
      ),
    );

    const moviesInfoHashMap = _(moviesInfo)
      .compact()
      .keyBy((movieInfo) => movieInfo.id)
      .value();

    const tickets =
      await this._dbContext.ticketRepository.listByMovieSessionIds(
        movieSessions.map(({ movieSessionId }) => movieSessionId),
      );

    return {
      movieSessions: movieSessions.map((movieSession) => {
        const movieInfo = moviesInfoHashMap[movieSession.movieId];

        return {
          id: movieSession.movieSessionId,
          movieName: movieInfo!.name,
          thumbnailUrl: movieInfo!.thumbnailUrl,
          startTime: movieSession.startTime,
          endTime: movieSession.endTime,
          status: movieSession.status,
          availableSeats: tickets.filter(({ visitorId }) => visitorId === null)
            .length,
          totalSeats: tickets.length,
        };
      }),
    };
  }
}
