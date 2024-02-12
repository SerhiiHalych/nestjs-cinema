import { Global, Module } from '@nestjs/common';

import { EventDispatcher } from './application/events/EventDispatcher';
import { BaseToken, CommandToken } from './diTokens';
import { RabbitMQIntegrationService } from './infrastructure/RabbitMQIntegrationService';
import { AppConfigModule } from './infrastructure/configuration/AppConfigModule';
import { DatabaseModule } from './infrastructure/persistence/DatabaseModule';
import { BindTicketToVisitorCommand } from '../movieSession/application/commands/bindTicketToVisitor/BindTicketToVisitorCommand';
import { TicketPurchasedEventHandler } from '../movieSession/infrastructure/eventHandlers/TicketPurchasedEventHandler';

@Global()
@Module({
  imports: [DatabaseModule, AppConfigModule],
  providers: [
    {
      provide: BaseToken.EVENT_DISPATCHER,
      useClass: EventDispatcher,
    },

    {
      provide: BaseToken.INTEGRATION_SERVICE,
      useClass: RabbitMQIntegrationService,
    },
    TicketPurchasedEventHandler,
    {
      provide: CommandToken.BIND_TICKET_TO_CUSTOMER,
      useClass: BindTicketToVisitorCommand,
    },
  ],
  exports: [
    {
      provide: BaseToken.EVENT_DISPATCHER,
      useClass: EventDispatcher,
    },

    {
      provide: BaseToken.INTEGRATION_SERVICE,
      useClass: RabbitMQIntegrationService,
    },
    TicketPurchasedEventHandler,
    {
      provide: CommandToken.BIND_TICKET_TO_CUSTOMER,
      useClass: BindTicketToVisitorCommand,
    },
  ],
})
export class CommonModule {}
