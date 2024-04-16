import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Libri API')
    .setDescription('The Libri API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
