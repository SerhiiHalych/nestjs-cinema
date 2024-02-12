import { MovieSessionEntity } from './MovieSessionEntity';
import { MovieSessionMapper } from './MovieSessionMapper';
import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { IMovieSessionRepository } from '../../application/boundaries/IMovieSessionRepository';
import { MovieSession } from '../../domain/entities/MovieSession';

export class MovieSessionRepository
  extends TypeOrmRepository<MovieSessionEntity>
  implements IMovieSessionRepository
{
  public async list(params: {
    movieId: string | null;
  }): Promise<MovieSession[]> {
    const movieSessionEntities = await this.repository.find({
      where: {
        movieId: params.movieId ?? undefined,
      },
    });

    return movieSessionEntities.map(MovieSessionMapper.toDto);
  }

  public async findById(id: string): Promise<MovieSession | null> {
    const movieSessionEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!movieSessionEntity) {
      return null;
    }

    return MovieSessionMapper.toDto(movieSessionEntity);
  }

  public async save(data: MovieSession): Promise<MovieSession> {
    const movieSessionEntity = MovieSessionMapper.toEntity(data);

    const createdMovieSessionEntity =
      await this.repository.save(movieSessionEntity);

    return MovieSessionMapper.toDto(createdMovieSessionEntity);
  }
}
