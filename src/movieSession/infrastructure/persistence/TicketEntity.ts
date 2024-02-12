import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { MovieSessionEntity } from './MovieSessionEntity';

export type SaveableTicketEntity = Omit<TicketEntity, 'movieSession'>;

@Entity({ name: 'ticket' })
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ticket_id' })
  id: string;

  @Column({ type: 'uuid', name: 'movie_session_id' })
  movieSessionId: string;

  @Column({ type: 'uuid', name: 'visitor_id', nullable: true })
  visitorId: string | null;

  @Column({ type: 'int', name: 'seat_number' })
  seatNumber: number;

  @Column({ type: 'float', name: 'price' })
  price: number;

  @ManyToOne(() => MovieSessionEntity)
  @JoinColumn({ name: 'movie_session_id' })
  movieSession: MovieSessionEntity;
}
