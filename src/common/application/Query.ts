import { Inject } from '@nestjs/common';

import { IDbContext } from './IDbContext';
import { BaseToken } from '../diTokens';

export abstract class Query<TInput, TOutput> {
  protected _input: TInput;

  @Inject(BaseToken.DB_CONTEXT)
  protected _dbContext: IDbContext;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;

    const result: TOutput = await this.implementation();

    return result;
  }

  protected abstract implementation(): Promise<TOutput> | TOutput;
}
