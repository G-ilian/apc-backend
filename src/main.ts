import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8080;

  const logger = new Logger('Bootstrap');

  // SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle('Documentação da API Aprucare')
    .setDescription(
      'API responsável pelo gerenciamento de alertas no sistema Aprucare.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // APP CONFIG
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setBaseViewsDir(join(__dirname, '..', 'templates'));
  hbs.registerPartials(join(__dirname, '..', 'templates', 'partials'));
  app.setViewEngine('hbs');
  hbs.registerHelper('eq', (a, b) => a === b);

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Error during application bootstrap', error);
});
