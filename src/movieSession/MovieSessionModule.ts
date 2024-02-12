import { Module } from '@nestjs/common';

import { BindTicketToVisitorCommand } from './application/commands/bindTicketToVisitor/BindTicketToVisitorCommand';
import { CancelMovieSessionCommand } from './application/commands/cancelMovieSession/CancelMovieSessionCommand';
import { CancelTicketReservationCommand } from './application/commands/cancelTicketReservation/CancelTicketReservationCommand';
import { GetMovieSessionQuery } from './application/queries/getMovieSession/GetMovieSessionQuery';
import { ListMovieSessionsQuery } from './application/queries/listMovieSessions/ListMovieSessionsQuery';
import { MovieSessionController } from './infrastructure/api/MovieSessionController';
import { TicketController } from './infrastructure/api/TicketController';
import { InMemoryMovieProvider } from './infrastructure/services/InMemoryMovieProvider';
import { CommandToken, QueryToken, ServiceToken } from '../common/diTokens';

@Module({
  controllers: [TicketController, MovieSessionController],
  providers: [
    {
      provide: QueryToken.GET_MOVIE_SESSION,
      useClass: GetMovieSessionQuery,
    },
    {
      provide: QueryToken.LIST_MOVIE_SESSIONS,
      useClass: ListMovieSessionsQuery,
    },
    {
      provide: CommandToken.CANCEL_MOVIE_SESSION,
      useClass: CancelMovieSessionCommand,
    },
    {
      provide: CommandToken.CANCEL_TICKET_BINDING,
      useClass: CancelTicketReservationCommand,
    },

    {
      provide: ServiceToken.MOVIE_PROVIDER,
      useClass: InMemoryMovieProvider,
    },
  ],
})
export class MovieSessionModule {}
