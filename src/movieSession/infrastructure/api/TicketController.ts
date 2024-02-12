import { Controller, Inject, Param, Post } from '@nestjs/common';

import { CommandToken } from '../../../common/diTokens';
import { ICancelTicketReservationCommand } from '../../application/commands/cancelTicketReservation/ICancelTicketReservationCommand';

@Controller({
  path: 'tickets',
})
export class TicketController {
  constructor(
    @Inject(CommandToken.CANCEL_TICKET_BINDING)
    private readonly _cancelTicketReservationCommand: ICancelTicketReservationCommand,
  ) {}

  @Post(':ticketId/cancel')
  async cancelTicketReservation(
    @Param('ticketId') ticketId: string,
  ): Promise<void> {
    await this._cancelTicketReservationCommand.execute({
      ticketId,
    });
  }
}
