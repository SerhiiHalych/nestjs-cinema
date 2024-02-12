import { join } from 'path';

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { DbContext } from './DbContext';
import { BaseToken } from '../../diTokens';
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
    migrations: [join(__dirname, '/migrations/**/*{.ts,.js}')],
    logging: ['error'],
  };
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return constructTypeOrmConfiguration(appConfigService);
      },
    }),
  ],
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

    {
      provide: BaseToken.DB_CONTEXT,
      useClass: DbContext,
    },
  ],
  exports: [
    {
      provide: BaseToken.DB_CONTEXT,
      useClass: DbContext,
    },
  ],
})
export class DatabaseModule {}
