import { Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';

import { CommandToken, QueryToken } from '../../../common/diTokens';
import { ICancelMovieSessionCommand } from '../../application/commands/cancelMovieSession/ICancelMovieSessionCommand';
import {
  GetMovieSessionQueryOutput,
  IGetMovieSessionQuery,
} from '../../application/queries/getMovieSession/IGetMovieSessionQuery';
import {
  IListMovieSessionsQuery,
  ListMovieSessionsQueryOutput,
} from '../../application/queries/listMovieSessions/IListMovieSessionsQuery';

@Controller({
  path: 'movie-sessions',
})
export class MovieSessionController {
  constructor(
    @Inject(QueryToken.GET_MOVIE_SESSION)
    private readonly _getMovieSessionQuery: IGetMovieSessionQuery,

    @Inject(QueryToken.LIST_MOVIE_SESSIONS)
    private readonly _listMovieSessionsQuery: IListMovieSessionsQuery,

    @Inject(CommandToken.CANCEL_MOVIE_SESSION)
    private readonly _cancelMovieSessionCommand: ICancelMovieSessionCommand,
  ) {}

  @Get()
  listMovieSessions(
    @Query('movie_id') movieId: string,
  ): Promise<ListMovieSessionsQueryOutput> {
    return this._listMovieSessionsQuery.execute({
      movieId,
    });
  }

  @Get(':movieSessionId')
  getMovieSession(
    @Param('movieSessionId') movieSessionId: string,
  ): Promise<GetMovieSessionQueryOutput> {
    return this._getMovieSessionQuery.execute({
      id: movieSessionId,
    });
  }

  @Post(':movieSessionId/cancel')
  async cancelMovieSession(
    @Param('movieSessionId') movieSessionId: string,
  ): Promise<void> {
    await this._cancelMovieSessionCommand.execute({
      id: movieSessionId,
    });
  }
}
