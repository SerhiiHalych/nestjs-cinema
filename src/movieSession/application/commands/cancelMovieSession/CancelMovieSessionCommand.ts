import { Injectable, Scope } from '@nestjs/common';

import {
  CancelMovieSessionCommandInput,
  ICancelMovieSessionCommand,
} from './ICancelMovieSessionCommand';
import { Command } from '../../../../common/application/Command';

@Injectable({ scope: Scope.REQUEST })
export class CancelMovieSessionCommand
  extends Command<CancelMovieSessionCommandInput>
  implements ICancelMovieSessionCommand
{
  protected async implementation(): Promise<void> {
    const { id } = this._input;

    const movieSession =
      await this._dbContext.movieSessionRepository.findById(id);

    if (!movieSession) {
      throw new Error('Movie session does not exist');
    }

    movieSession.cancel(this._eventDispatcher);

    await this._dbContext.movieSessionRepository.save(movieSession);
  }
}
