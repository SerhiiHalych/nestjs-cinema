import { Injectable, Scope } from '@nestjs/common';

import {
  BindTicketToVisitorCommandInput,
  IBindTicketToVisitorCommand,
} from './IBindTicketToVisitorCommand';
import { Command } from '../../../../common/application/Command';

@Injectable({ scope: Scope.REQUEST })
export class BindTicketToVisitorCommand
  extends Command<BindTicketToVisitorCommandInput>
  implements IBindTicketToVisitorCommand
{
  protected async implementation(): Promise<void> {
    const { visitorId, ticketId } = this._input;

    const ticket = await this._dbContext.ticketRepository.findById(ticketId);

    if (ticket === null) {
      throw new Error('Ticket does not exist');
    }

    ticket.reserve(visitorId, this._eventDispatcher);

    await this._dbContext.ticketRepository.save(ticket);
  }
}
