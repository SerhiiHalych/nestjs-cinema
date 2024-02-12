import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './AppConfigService';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
