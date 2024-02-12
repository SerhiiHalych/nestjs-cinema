import { Inject, Injectable, Scope } from '@nestjs/common';
import * as _ from 'lodash';

import { CommandToken } from '../../../common/diTokens';
import { IBindTicketToVisitorCommand } from '../../application/commands/bindTicketToVisitor/IBindTicketToVisitorCommand';

@Injectable({ scope: Scope.REQUEST })
export class TicketPurchasedEventHandler {
  constructor(
    @Inject(CommandToken.BIND_TICKET_TO_CUSTOMER)
    private readonly _bindTicketToVisitor: IBindTicketToVisitorCommand,
  ) {}

  public async handle(payload: {
    customerId: string;
    ticketId: string;
  }): Promise<void> {
    const { customerId, ticketId } = payload;

    await this._bindTicketToVisitor.execute({
      visitorId: customerId,
      ticketId,
    });
  }
}
