import { Inject, Injectable, Scope } from '@nestjs/common';
import type {
  DataSource,
  EntityTarget,
  ObjectLiteral,
  EntityManager,
} from 'typeorm';

import { ICinemaHallRepository } from '../../../movieSession/application/boundaries/ICinemaHallRepository';
import { IMovieSessionRepository } from '../../../movieSession/application/boundaries/IMovieSessionRepository';
import { ITicketRepository } from '../../../movieSession/application/boundaries/ITicketRepository';
import { CinemaHallEntity } from '../../../movieSession/infrastructure/persistence/CinemaHallEntity';
import { CinemaHallRepository } from '../../../movieSession/infrastructure/persistence/CinemaHallRepository';
import { MovieSessionEntity } from '../../../movieSession/infrastructure/persistence/MovieSessionEntity';
import { MovieSessionRepository } from '../../../movieSession/infrastructure/persistence/MovieSessionRepository';
import { TicketEntity } from '../../../movieSession/infrastructure/persistence/TicketEntity';
import { TicketRepository } from '../../../movieSession/infrastructure/persistence/TicketRepository';
import type { IDbContext } from '../../application/IDbContext';
import { BaseToken } from '../../diTokens';

@Injectable({ scope: Scope.REQUEST })
export class DbContext implements IDbContext {
  private _manager: EntityManager;

  private _cinemaHallRepository: ICinemaHallRepository;
  private _movieSessionRepository: IMovieSessionRepository;
  private _ticketRepository: ITicketRepository;

  constructor(
    @Inject(BaseToken.DATA_SOURCE) private readonly dataSource: DataSource,
  ) {
    this._manager = dataSource.manager;

    this.initRepositories();
  }

  private getRepository<
    TEntity extends EntityTarget<ObjectLiteral>,
    TRepository,
  >(ctor: new (...args: any[]) => TRepository, entity: TEntity): TRepository {
    return new ctor(this._manager.getRepository(entity), this.dataSource);
  }

  private initRepositories(): void {
    this._cinemaHallRepository = this.getRepository(
      CinemaHallRepository,
      CinemaHallEntity,
    );
    this._movieSessionRepository = this.getRepository(
      MovieSessionRepository,
      MovieSessionEntity,
    );
    this._ticketRepository = this.getRepository(TicketRepository, TicketEntity);
  }

  get cinemaHallRepository(): ICinemaHallRepository {
    return this._cinemaHallRepository;
  }

  get movieSessionRepository(): IMovieSessionRepository {
    return this._movieSessionRepository;
  }

  get ticketRepository(): ITicketRepository {
    return this._ticketRepository;
  }

  async startTransaction(): Promise<void> {
    this._manager = this.dataSource.createQueryRunner().manager;

    this.initRepositories();

    await this._manager.queryRunner!.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    if (this._manager.queryRunner) {
      await this._manager.queryRunner.commitTransaction();

      await this._manager.queryRunner.release();
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (this._manager.queryRunner) {
      await this._manager.queryRunner.rollbackTransaction();

      await this._manager.queryRunner.release();
    }
  }
}
