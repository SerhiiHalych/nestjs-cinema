import { CinemaHallEntity } from './CinemaHallEntity';
import { CinemaHallMapper } from './CinemaHallMapper';
import { TypeOrmRepository } from '../../../common/infrastructure/persistence/TypeOrmRepository';
import { ICinemaHallRepository } from '../../application/boundaries/ICinemaHallRepository';
import { CinemaHall } from '../../domain/entities/CinemaHall';

export class CinemaHallRepository
  extends TypeOrmRepository<CinemaHallEntity>
  implements ICinemaHallRepository
{
  public async findById(id: string): Promise<CinemaHall | null> {
    const cinemaHallEntity = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!cinemaHallEntity) {
      return null;
    }

    return CinemaHallMapper.toDto(cinemaHallEntity);
  }
}
