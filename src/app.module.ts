import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Meeting } from './entities/meeting.entity';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Configura o TypeORM para trabalhar com o SQLite
      database: 'db.sqlite', // Cria um arquivo na raiz do projeto, para o banco de dados, chamado db.sqlite
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Encaneia por todos os arquivos de definição de entidade do projeto
      synchronize: true, // Cria o banco de dados automaticamente
      logging: true, // Adiciona Logs
    }),
    TypeOrmModule.forFeature([Task, Meeting]),
    EmployeesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
