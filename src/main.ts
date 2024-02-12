/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', { error });
});

process.on('uncaughtException', (error) => {
  console.error('uncaughtException', { error });
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
