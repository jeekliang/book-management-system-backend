import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { MyLogger } from './MyLogger';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });
  // app.useLogger(app.get(WINSTON_LOGGER_TOKEN));
  
  await app.listen(3000);
}
bootstrap();
