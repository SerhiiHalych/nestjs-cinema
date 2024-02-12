import { Ticket } from '../../domain/entities/Ticket';

export interface ITicketRepository {
  findById(id: string): Promise<Ticket | null>;

  listByMovieSessionId(movieSessionId: string): Promise<Ticket[]>;

  listByMovieSessionIds(movieSessionIds: string[]): Promise<Ticket[]>;

  save(data: Ticket): Promise<Ticket>;
}
