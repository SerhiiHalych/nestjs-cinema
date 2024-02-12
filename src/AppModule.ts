import { Inject, Module, OnModuleInit } from '@nestjs/common';

import { CommonModule } from './common/CommonModule';
import { IIntegrationService } from './common/application/IIntegrationService';
import { BaseToken } from './common/diTokens';
import { MovieSessionModule } from './movieSession/MovieSessionModule';

@Module({
  imports: [CommonModule, MovieSessionModule],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(BaseToken.INTEGRATION_SERVICE)
    private readonly _integrationService: IIntegrationService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this._integrationService.listen();
  }
}
