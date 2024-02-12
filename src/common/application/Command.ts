import { Inject } from '@nestjs/common';

import type { IDbContext } from './IDbContext';
import { BaseToken } from '../diTokens';
import { IEventDispatcher } from '../domain/IEventDispatcher';

export abstract class Command<TInput = void, TOutput = void> {
  protected _input: TInput;

  @Inject(BaseToken.EVENT_DISPATCHER)
  protected _eventDispatcher: IEventDispatcher;

  @Inject(BaseToken.DB_CONTEXT)
  protected _dbContext: IDbContext;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;

    await this._dbContext.startTransaction();

    let result: TOutput;

    try {
      result = await this.implementation();

      await this._dbContext.commitTransaction();

      this._eventDispatcher.dispatchEvents();
    } catch (error) {
      await this._dbContext.rollbackTransaction();

      throw error;
    }

    return result;
  }

  protected abstract implementation(): Promise<TOutput> | TOutput;
}
