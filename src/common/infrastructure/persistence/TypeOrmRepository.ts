import { DataSource, ObjectLiteral, Repository } from 'typeorm';

export abstract class TypeOrmRepository<TTypeOrmEntity extends ObjectLiteral> {
  constructor(
    protected readonly repository: Repository<TTypeOrmEntity>,
    protected readonly dataSource: DataSource,
  ) {}
}
