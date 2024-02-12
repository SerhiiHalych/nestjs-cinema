import { join } from 'path';

import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DataSourceOptions, DataSource } from 'typeorm';

import { BaseToken } from '../../diTokens';
import { AppConfigModule } from '../configuration/AppConfigModule';
import { AppConfigService } from '../configuration/AppConfigService';

const constructTypeOrmConfiguration = (
  appConfigService: AppConfigService,
): DataSourceOptions => {
  const distPath = join(__dirname, '../../../');

  return {
    type: 'postgres',
    host: appConfigService.database.HOST,
    port: appConfigService.database.PORT,
    username: appConfigService.database.USER,
    password: appConfigService.database.PASSWORD,
    database: appConfigService.database.NAME,
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,
    entities: [join(distPath, '**', '*Entity{.ts,.js}')],
    migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
    logging: ['error', 'migration'],
  };
};

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      inject: [AppConfigService],
      provide: BaseToken.DATA_SOURCE,
      useFactory: (appConfigService: AppConfigService) => {
        const dataSource = new DataSource(
          constructTypeOrmConfiguration(appConfigService),
        );

        return dataSource.initialize();
      },
    },
  ],
})
export class MigrationModule {}

export default NestFactory.createApplicationContext(MigrationModule)
  .then((app) => app.resolve(AppConfigService))
  .then(
    (appConfigService) =>
      new DataSource(constructTypeOrmConfiguration(appConfigService)),
  );
