import type { Event } from './Event';

export interface IEventDispatcher {
  registerEvent(event: Event<any>): void;

  dispatchEvents(): void;
}
