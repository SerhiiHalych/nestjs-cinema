import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import {
  CinemaHallSeatEntity,
  SaveableCinemaHallSeatEntity,
} from './CinemaHallSeatEntity';

export type SaveableCinemaHallEntity = Omit<CinemaHallEntity, 'seats'> & {
  seats: SaveableCinemaHallSeatEntity[];
};

@Entity({ name: 'cinema_hall' })
export class CinemaHallEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'cinema_hall_id' })
  id: string;

  @Column('int', { name: 'cinema_hall_number' })
  cinemaHallNumber: number;

  @OneToMany(() => CinemaHallSeatEntity, ({ cinemaHall }) => cinemaHall, {
    cascade: true,
    eager: true,
  })
  seats: CinemaHallSeatEntity[];
}
