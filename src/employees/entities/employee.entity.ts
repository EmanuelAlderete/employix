import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';

@Entity() // É necessário adicionar o _decorator_ do TypeORM para identificar que está sendo criada uma entity
export class Employee {
  @PrimaryGeneratedColumn() // Define a coluna primária com AUTOINCREMENT
  id: number;

  @Column() // // Define a coluna
  name: string;

  // Define a relação do UserxUser(gerente),
  // e define que quando um gerente é excluído,
  // seus funcionários recebem um null nessa coluna.
  // Cria de forma implícia do managerId
  @ManyToOne(() => Employee, { onDelete: 'SET NULL' })
  @JoinColumn()
  manager?: Employee;

  // Aqui eu defino EXPLICITAMENTE a coluna managerId para poder acessá-la futuramente.
  // Não é obrigatório pois o TypeORM cria a coluna automáticamente
  // porém, nesse caso, não poderia acessá-la através do objeto, pois
  // não managerId não está no Type do Employee
  @Column({ nullable: true })
  managerId?: number;

  @OneToOne(() => ContactInfo, { cascade: true }) // CASCADE TRUE: se deletar o usuário, deleta as informações de contato
  @JoinColumn()
  contactInfo?: ContactInfo;

  @Column({ nullable: true })
  contactInfoId?: number;
}
