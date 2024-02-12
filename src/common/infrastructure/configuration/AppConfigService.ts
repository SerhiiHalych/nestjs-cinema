import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigs } from './AppConfigs';

@Injectable()
export class AppConfigService {
  public readonly database: Readonly<{
    PORT: number;
    HOST: string;
    USER: string;
    PASSWORD: string;
    NAME: string;
  }>;

  public readonly api: Readonly<{
    PORT: number;
  }>;

  constructor(private readonly configService: ConfigService<AppConfigs, true>) {
    this.database = {
      PORT: this.configService.get('DB_PORT'),
      HOST: this.configService.get('DB_HOST'),
      USER: this.configService.get('DB_USER'),
      PASSWORD: this.configService.get('DB_PASSWORD'),
      NAME: this.configService.get('DB_NAME'),
    };

    this.api = {
      PORT: this.configService.get('API_PORT'),
    };
  }
}
