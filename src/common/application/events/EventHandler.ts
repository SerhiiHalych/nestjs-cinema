import { Inject } from '@nestjs/common';

import { BaseToken } from '../../diTokens';
import type { Event } from '../../domain/Event';
import { IEventDispatcher } from '../../domain/IEventDispatcher';
import type { IDbContext } from '../IDBContext';

export abstract class EventHandler<TEvent extends Event<any>> {
  protected _event: TEvent;

  @Inject(BaseToken.EVENT_DISPATCHER)
  protected _eventDispatcher: IEventDispatcher;

  @Inject(BaseToken.DB_CONTEXT)
  protected _dbContext: IDbContext;

  async handle(event: TEvent): Promise<void> {
    this._event = event;

    await this._dbContext.startTransaction();

    try {
      await this.implementation(event);

      await this._dbContext.commitTransaction();

      this._eventDispatcher.dispatchEvents();

      console.log(
        `Event handler ${this.constructor.name} successfully finished.`,
      );
    } catch (error) {
      console.log(
        `Event handler ${this.constructor.name} failed with error: ${error}`,
      );

      await this._dbContext.rollbackTransaction();
    }
  }

  protected abstract implementation(event: TEvent): Promise<void>;
}
