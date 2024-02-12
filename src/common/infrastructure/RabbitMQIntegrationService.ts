import util from 'util';

import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import * as amqp from 'amqplib/callback_api';

import { IntegrationEventType } from './events/IntegrationEventType';
import { TicketPurchasedEventHandler } from '../../movieSession/infrastructure/eventHandlers/TicketPurchasedEventHandler';
import { IIntegrationService } from '../application/IIntegrationService';
import { Event } from '../domain/Event';

@Injectable()
export class RabbitMQIntegrationService implements IIntegrationService {
  private readonly _QUEUE = 'cinema-integration-events';

  private _channel: amqp.Channel | null = null;

  constructor(private readonly moduleRef: ModuleRef) {}

  listen(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      // Connect to RabbitMQ server
      amqp.connect((error, connection) => {
        if (error !== null) {
          reject(error);
        }

        // Create a channel
        connection.createChannel((error, channel) => {
          if (error !== null) {
            reject(error);
          }

          this._channel = channel;

          channel.assertQueue(this._QUEUE, { durable: false });

          channel.consume(
            this._QUEUE,
            async (message) => {
              if (message) {
                const event: {
                  type: IntegrationEventType.TICKET_PURCHASED;
                  customerId: string;
                  ticketId: string;
                } = JSON.parse(message.content.toString());

                console.log(
                  `\n\nReceived event: ${JSON.stringify(event, null, 2)}`,
                );

                if (event.type === IntegrationEventType.TICKET_PURCHASED) {
                  const hander = await this.moduleRef.resolve(
                    TicketPurchasedEventHandler,
                  );

                  await hander.handle({
                    customerId: event.customerId,
                    ticketId: event.ticketId,
                  });
                }
              }
            },
            { noAck: true },
          );

          resolve();
        });
      });
    });
  }

  publishEvent(event: Event<any>): void {
    this._channel?.sendToQueue(this._QUEUE, Buffer.from(JSON.stringify(event)));
  }
}
