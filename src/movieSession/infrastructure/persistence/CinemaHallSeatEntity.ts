import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CinemaHallEntity } from './CinemaHallEntity';

export type SaveableCinemaHallSeatEntity = Omit<
  CinemaHallSeatEntity,
  'id' | 'cinemaHallId' | 'cinemaHall'
>;

@Entity({ name: 'cinema_hall_seat' })
export class CinemaHallSeatEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'cinema_hall_seat_id' })
  id: string;

  @Column({ type: 'int', name: 'seat_number' })
  seatNumber: number;

  @Column({ type: 'uuid', name: 'cinema_hall_id' })
  cinemaHallId: string;

  @ManyToOne(() => CinemaHallEntity)
  @JoinColumn({ name: 'cinema_hall_id' })
  cinemaHall: CinemaHallEntity;
}
