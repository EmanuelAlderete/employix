import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // É necessário adicionar o _decorator_ do TypeORM para identificar que está sendo criada uma entity
export class Employee {
  @PrimaryGeneratedColumn() // Define a coluna primária com AUTOINCREMENT
  id: number;

  @Column() // // Define a coluna
  name: string;

  // Define a relação do UserxUser(gerente),
  // e define que quando um gerente é excluído,
  // seus funcionários recebem um null nessa coluna.
  @ManyToOne(() => Employee, { onDelete: 'SET NULL' })
  manager: Employee;
}
