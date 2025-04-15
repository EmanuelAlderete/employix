import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Employee } from './employees/entities/employee.entity';
import { ContactInfo } from './employees/entities/contact-info.entity';
import { Task } from './entities/task.entity';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async seed() {
    await this.dataSource.transaction(async (db) => {
      const ceo = db.create(Employee, {
        name: 'Mr. CEO',
      });

      await db.save(ceo);

      const contactInfo = db.create(ContactInfo, {
        phone: '+555 343 3243',
        email: 'ceo@123start.com',
        employee: ceo,
      });

      await db.save(contactInfo);

      const manager = db.create(Employee, {
        name: 'Mr. Manager',
        manager: ceo,
      });

      await db.save(manager);

      const task1 = db.create(Task, {
        name: 'Present to CEO',
        assignee: manager,
      });

      const task2 = db.create(Task, {
        name: 'Hire people',
        assignee: manager,
      });

      await db.save([task1, task2]);

      const meeting = db.create(Meeting, {
        zoomUrl: 'zoom.com?id=123d21s2e',
        attendees: [ceo, manager],
      });

      await db.save(meeting);
    });
  }
}
