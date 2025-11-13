import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: ['*'],
    methods: ['OPTIONS', 'HEAD', 'GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
