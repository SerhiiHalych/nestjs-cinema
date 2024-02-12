import type { EventType } from '../domain/EventType';

export abstract class Event<TPayload> {
  public readonly payload: Readonly<TPayload>;
  public abstract readonly eventType: EventType;

  constructor(payload: TPayload) {
    this.payload = Object.freeze(payload);
  }
}
