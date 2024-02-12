import { MovieSession } from '../../domain/entities/MovieSession';

export interface IMovieSessionRepository {
  findById(id: string): Promise<MovieSession | null>;

  list(params: { movieId: string | null }): Promise<MovieSession[]>;

  save(data: MovieSession): Promise<MovieSession>;
}
