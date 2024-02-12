import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CinemaHallEntity } from './CinemaHallEntity';
import { MovieSessionStatus } from '../../domain/enums/MovieSessionStatus';

export type SaveableMovieSessionEntity = Omit<MovieSessionEntity, 'cinemaHall'>;

@Entity({ name: 'movie_session' })
export class MovieSessionEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'movie_session_id' })
  id: string;

  @Column({ type: 'uuid', name: 'movie_id' })
  movieId: string;

  @Column({ type: 'uuid', name: 'cinema_hall_id' })
  cinemaHallId: string;

  @Column('timestamp', { name: 'start_time' })
  startTime: Date;

  @Column('timestamp', { name: 'end_time' })
  endTime: Date;

  @Column({
    type: 'enum',
    name: 'movie_session_status',
    enum: MovieSessionStatus,
  })
  status: MovieSessionStatus;

  @ManyToOne(() => CinemaHallEntity)
  @JoinColumn({ name: 'cinema_hall_id' })
  cinemaHall: CinemaHallEntity;
}
