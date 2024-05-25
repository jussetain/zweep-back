import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaErrorsFilter } from 'providers/utils/prisma.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const validationPipe = new ValidationPipe({
    transform: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Zweep')
    .setDescription('The Zweep API description')
    .setVersion('1.0')
    .addTag('zweep')
    .build();

  app.useGlobalPipes(validationPipe);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaErrorsFilter(httpAdapter));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3030);
}

bootstrap();
