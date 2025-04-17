import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, unlinkSync } from 'fs';
import { AppService } from './app.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const dbFile = 'db.sqlite';
  if (existsSync(dbFile)) unlinkSync(dbFile); // Confere se o banco já existe, e se exister deleta toda vez que aplicação roda

  const app = await NestFactory.create(AppModule);

  // ====== INÍCIO CONFIGURAÇÃO SWAGGER ======
  const config = new DocumentBuilder()
  .setTitle('Documentação com Swagger - Employix')
  .setDescription('API RESTful construída em NestJS para aplicação dos conceitos de CQRS.')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
// ====== FIM CONFIGURAÇÃO SWAGGER ======

// Configuração de Validation
  app.useGlobalPipes(new ValidationPipe());

  const appService = app.get(AppService);
  await appService.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
