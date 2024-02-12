import { IEventDispatcher } from '../../../common/domain/IEventDispatcher';
import { MovieSessionStatus } from '../enums/MovieSessionStatus';
import { MovieSessionCanceledEvent } from '../events/MovieSessionCanceledEvent';

export class MovieSession {
  private readonly _movieSessionId: string;
  private readonly _movieId: string;
  private readonly _cinemaHallId: string;
  private readonly _startTime: Date;
  private readonly _endTime: Date;
  private _status: MovieSessionStatus;

  constructor(
    movieSessionId: string,
    movieId: string,
    cinemaHallId: string,
    startTime: Date,
    endTime: Date,
    status: MovieSessionStatus,
  ) {
    this._movieSessionId = movieSessionId;
    this._movieId = movieId;
    this._cinemaHallId = cinemaHallId;
    this._startTime = startTime;
    this._endTime = endTime;
    this._status = status;
  }

  public get movieSessionId(): string {
    return this._movieSessionId;
  }

  public get movieId(): string {
    return this._movieId;
  }

  public get cinemaHallId(): string {
    return this._cinemaHallId;
  }

  public get startTime(): Date {
    return this._startTime;
  }

  public get endTime(): Date {
    return this._endTime;
  }

  public get status(): MovieSessionStatus {
    return this._status;
  }

  public cancel(eventDispatcher: IEventDispatcher): void {
    if (this._status === MovieSessionStatus.CANCELED) {
      throw new Error('Movie session already canceled');
    }

    if (this._status === MovieSessionStatus.CLOSED) {
      throw new Error('Movie session already closed');
    }

    this._status = MovieSessionStatus.CANCELED;

    eventDispatcher.registerEvent(
      new MovieSessionCanceledEvent({
        movieSessionId: this._movieSessionId,
      }),
    );
  }
}
