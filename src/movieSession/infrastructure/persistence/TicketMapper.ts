import { TicketEntity, SaveableTicketEntity } from './TicketEntity';
import { Ticket } from '../../domain/entities/Ticket';

export class TicketMapper {
  static toDto(from: TicketEntity): Ticket {
    const { visitorId, id, movieSessionId, price, seatNumber } = from;

    return new Ticket(id, movieSessionId, seatNumber, price, visitorId);
  }

  static toEntity(from: Ticket): SaveableTicketEntity {
    const { visitorId, movieSessionId, price, seatNumber, ticketId } = from;

    return {
      id: ticketId,
      visitorId,
      movieSessionId,
      price,
      seatNumber,
    };
  }
}
