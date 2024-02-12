import { CinemaHall } from '../../domain/entities/CinemaHall';

export interface ICinemaHallRepository {
  findById(id: string): Promise<CinemaHall | null>;
}
