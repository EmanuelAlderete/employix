import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ContactInfo } from './entities/contact-info.entity';
import { Task } from './entities/task.entity';
import { Meeting } from './entities/meeting.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Configura o TypeORM para trabalhar com o SQLite
      database: 'db.sqlite', // Cria um arquivo na raiz do projeto, para o banco de dados, chamado db.sqlite
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Encaneia por todos os arquivos de definição de entidade do projeto
      synchronize: true, // Cria o banco de dados automaticamente
      logging: true, // Adiciona Logs
    }),
    TypeOrmModule.forFeature([Employee, ContactInfo, Task, Meeting]),
  ],
  providers: [AppService],
})
export class AppModule {}
