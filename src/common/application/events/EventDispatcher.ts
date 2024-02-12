/* eslint-disable no-console */
import { Inject, Injectable, Scope } from '@nestjs/common';

import { BaseToken } from '../../diTokens';
import type { Event } from '../../domain/Event';
import type { IEventDispatcher } from '../../domain/IEventDispatcher';
import { IIntegrationService } from '../IIntegrationService';

@Injectable({ scope: Scope.REQUEST })
export class EventDispatcher implements IEventDispatcher {
  private readonly _publishedEvents: Event<any>[];

  constructor(
    @Inject(BaseToken.INTEGRATION_SERVICE)
    private readonly _integrationService: IIntegrationService,
  ) {
    this._publishedEvents = [];
  }

  registerEvent(event: Event<any>): void {
    console.log(`Event registered: ${event.eventType}`);

    this._publishedEvents.push(event);
  }

  dispatchEvents(): void {
    this._publishedEvents.map((event) => {
      setImmediate(async () => {
        try {
          await this.dispatchEvent(event);
        } catch (e) {
          console.error(`Error during commit handlers execution`, e);
        }
      });
    });
  }

  private async dispatchEvent(event: Event<any>): Promise<void> {
    this._integrationService.publishEvent(event);

    console.log(`Event ${event.eventType} is published`);
  }
}
