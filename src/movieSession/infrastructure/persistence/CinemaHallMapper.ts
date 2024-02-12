import { CinemaHallEntity, SaveableCinemaHallEntity } from './CinemaHallEntity';
import { CinemaHall } from '../../domain/entities/CinemaHall';
import { Seat } from '../../domain/valueObjects/Seat';

export class CinemaHallMapper {
  static toDto(from: CinemaHallEntity): CinemaHall {
    const { id, cinemaHallNumber, seats } = from;

    return new CinemaHall(
      id,
      cinemaHallNumber,
      seats.map(({ seatNumber }) => new Seat(seatNumber)),
    );
  }

  static toEntity(from: CinemaHall): SaveableCinemaHallEntity {
    const { cinemaHallId, seats, cinemaHallNumber } = from;

    return {
      id: cinemaHallId,
      cinemaHallNumber,
      seats: seats.map(({ seatNumber }) => ({ seatNumber })),
    };
  }
}
