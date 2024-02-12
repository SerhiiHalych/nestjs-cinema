import { ICinemaHallRepository } from '../../movieSession/application/boundaries/ICinemaHallRepository';
import { IMovieSessionRepository } from '../../movieSession/application/boundaries/IMovieSessionRepository';
import { ITicketRepository } from '../../movieSession/application/boundaries/ITicketRepository';

export interface IDbContext {
  cinemaHallRepository: ICinemaHallRepository;
  movieSessionRepository: IMovieSessionRepository;
  ticketRepository: ITicketRepository;

  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;
}
