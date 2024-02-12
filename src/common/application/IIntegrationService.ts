import type { Event } from './../domain/Event';

export interface IIntegrationService {
  publishEvent(event: Event<any>): void;

  listen(): Promise<void>;
}
