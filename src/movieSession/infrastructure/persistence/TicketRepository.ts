import { In } from 'typeorm';

import { TicketEntity } from './TicketEntity';
import { TicketMapper } from './TicketMapper';
import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { ITicketRepository } from '../../application/boundaries/ITicketRepository';
import { Ticket } from '../../domain/entities/Ticket';

export class TicketRepository
  extends TypeOrmRepository<TicketEntity>
  implements ITicketRepository
{
  public async listByMovieSessionIds(
    movieSessionIds: string[],
  ): Promise<Ticket[]> {
    const ticketEntities = await this.repository.find({
      where: {
        movieSessionId: In(movieSessionIds),
      },
    });

    return ticketEntities.map(TicketMapper.toDto);
  }

  public async findById(id: string): Promise<Ticket | null> {
    const ticketEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!ticketEntity) {
      return null;
    }

    return TicketMapper.toDto(ticketEntity);
  }

  public async listByMovieSessionId(movieSessionId: string): Promise<Ticket[]> {
    const ticketEntities = await this.repository.find({
      where: {
        movieSessionId,
      },
    });

    return ticketEntities.map(TicketMapper.toDto);
  }

  public async save(data: Ticket): Promise<Ticket> {
    const ticketEntity = TicketMapper.toEntity(data);

    const createdTicketEntity = await this.repository.save(ticketEntity);

    return TicketMapper.toDto(createdTicketEntity);
  }
}
