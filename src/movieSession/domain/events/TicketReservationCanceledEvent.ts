import { Event } from '../../../common/domain/Event';
import { EventType } from '../../../common/domain/EventType';

interface TicketReservationCanceledEventPayload {
  ticketId: string;
  visitorId: string;
}

export class TicketReservationCanceledEvent extends Event<TicketReservationCanceledEventPayload> {
  eventType = EventType.TICKET_RESERVATION_CANCELED;
}
