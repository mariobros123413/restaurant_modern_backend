import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.enableCors();

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000, '0.0.0.0');

}
bootstrap();
