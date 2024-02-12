import { Event } from '../../../common/domain/Event';
import { EventType } from '../../../common/domain/EventType';

interface MovieSessionCanceledEventPayload {
  movieSessionId: string;
}

export class MovieSessionCanceledEvent extends Event<MovieSessionCanceledEventPayload> {
  eventType = EventType.MOVIE_SESSION_CANCELED;
}
