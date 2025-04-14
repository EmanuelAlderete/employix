import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // É necessário adicionar o _decorator_ do TypeORM para identificar que está sendo criada uma entity
export class Employee {
  @PrimaryGeneratedColumn() // Define a coluna primária com auto-increment
  id: number;

  @Column() // // Define a coluna
  name: string;
}
