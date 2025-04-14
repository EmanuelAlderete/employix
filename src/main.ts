import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, unlinkSync } from 'fs';
import { AppService } from './app.service';

async function bootstrap() {
  const dbFile = 'db.sqlite';
  if (existsSync(dbFile)) unlinkSync(dbFile); // Confere se o banco já existe, e se exister deleta toda vez que aplicação roda

  const app = await NestFactory.create(AppModule);

  const appService = app.get(AppService);
  await appService.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
