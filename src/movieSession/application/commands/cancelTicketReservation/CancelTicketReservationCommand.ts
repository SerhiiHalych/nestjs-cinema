import { Injectable, Scope } from '@nestjs/common';

import {
  CancelTicketReservationCommandInput,
  ICancelTicketReservationCommand,
} from './ICancelTicketReservationCommand';
import { Command } from '../../../../common/application/Command';

@Injectable({ scope: Scope.REQUEST })
export class CancelTicketReservationCommand
  extends Command<CancelTicketReservationCommandInput>
  implements ICancelTicketReservationCommand
{
  protected async implementation(): Promise<void> {
    const { ticketId } = this._input;

    const ticket = await this._dbContext.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new Error('Ticket does not exist');
    }

    ticket.cancelReservation(this._eventDispatcher);

    await this._dbContext.ticketRepository.save(ticket);
  }
}
