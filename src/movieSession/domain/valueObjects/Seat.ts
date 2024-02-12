export class Seat {
  private readonly _seatNumber: number;

  constructor(seatNumber: number) {
    this._seatNumber = seatNumber;
  }

  public get seatNumber():  number {
    return this._seatNumber
  }
}
