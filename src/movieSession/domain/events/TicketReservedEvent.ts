import { Event } from '../../../common/domain/Event';
import { EventType } from '../../../common/domain/EventType';

interface TicketReservedEventPayload {
  ticketId: string;
  visitorId: string;
}

export class TicketReservedEvent extends Event<TicketReservedEventPayload> {
  eventType = EventType.TICKET_RESERVED;
}
