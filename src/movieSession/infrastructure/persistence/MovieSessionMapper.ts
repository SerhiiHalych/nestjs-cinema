import {
  MovieSessionEntity,
  SaveableMovieSessionEntity,
} from './MovieSessionEntity';
import { MovieSession } from '../../domain/entities/MovieSession';

export class MovieSessionMapper {
  static toDto(from: MovieSessionEntity): MovieSession {
    const { cinemaHallId, endTime, id, movieId, startTime, status } = from;

    return new MovieSession(
      id,
      movieId,
      cinemaHallId,
      startTime,
      endTime,
      status,
    );
  }

  static toEntity(from: MovieSession): SaveableMovieSessionEntity {
    const {
      movieSessionId,
      movieId,
      cinemaHallId,
      startTime,
      endTime,
      status,
    } = from;

    return {
      id: movieSessionId,
      cinemaHallId,
      endTime,
      movieId,
      startTime,
      status,
    };
  }
}
