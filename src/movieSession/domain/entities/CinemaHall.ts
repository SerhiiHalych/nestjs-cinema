import { Seat } from '../../domain/valueObjects/Seat';

export class CinemaHall {
  private readonly _cinemaHallId: string;

  private readonly _cinemaHallNumber: number;

  private readonly _seats: Seat[];

  constructor(cinemaHallId: string, cinemaHallNumber: number, seats: Seat[]) {
    this._cinemaHallId = cinemaHallId;
    this._cinemaHallNumber = cinemaHallNumber;
    this._seats = seats;
  }

  public get cinemaHallId(): string {
    return this._cinemaHallId;
  }

  public get cinemaHallNumber(): number {
    return this._cinemaHallNumber;
  }

  public get seats(): Seat[] {
    return this._seats;
  }
}
