import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { TransformInterceptor } from './interceptor/transform.interception';
// import { MyLogger } from './MyLogger';
// import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // DTO 验证拦截器
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });
  // app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  // const config = new DocumentBuilder()
  //   .setTitle('Test example')
  //   .setDescription('The API description')
  //   .setVersion('1.0')
  //   .addTag('test')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
