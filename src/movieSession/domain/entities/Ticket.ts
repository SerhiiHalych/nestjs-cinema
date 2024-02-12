import { IEventDispatcher } from '../../../common/domain/IEventDispatcher';
import { TicketReservationCanceledEvent } from '../events/TicketReservationCanceledEvent';
import { TicketReservedEvent } from '../events/TicketReservedEvent';

export class Ticket {
  private readonly _ticketId: string;
  private readonly _movieSessionId: string;
  private readonly _seatNumber: number;
  private readonly _price: number;
  private _visitorId: string | null;

  constructor(
    ticketId: string,
    movieSessionId: string,
    seatNumber: number,
    price: number,
    visitorId: string | null,
  ) {
    this._ticketId = ticketId;
    this._movieSessionId = movieSessionId;
    this._seatNumber = seatNumber;
    this._price = price;
    this._visitorId = visitorId;
  }

  public get ticketId(): string {
    return this._ticketId;
  }

  public get movieSessionId(): string {
    return this._movieSessionId;
  }

  public get visitorId(): string | null {
    return this._visitorId;
  }

  public get seatNumber(): number {
    return this._seatNumber;
  }

  public get price(): number {
    return this._price;
  }

  reserve(visitorId: string, eventDispatcher: IEventDispatcher): void {
    if (this._visitorId !== null) {
      throw new Error('Ticket already reserved!');
    }

    this._visitorId = visitorId;

    eventDispatcher.registerEvent(
      new TicketReservedEvent({
        ticketId: this._ticketId,
        visitorId: this._visitorId,
      }),
    );
  }

  cancelReservation(eventDispatcher: IEventDispatcher): void {
    if (this._visitorId === null) {
      throw new Error('Ticket is not reserved!');
    }

    eventDispatcher.registerEvent(
      new TicketReservationCanceledEvent({
        ticketId: this._ticketId,
        visitorId: this._visitorId,
      }),
    );

    this._visitorId = null;
  }
}
