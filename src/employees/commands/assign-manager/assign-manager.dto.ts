import { IsInt, IsOptional } from 'class-validator';

export class AssignManagerDto {
   /**
   * Chave identificadora para relação Many-to-one com Gerente.
   * 
   * @example 1
   */
  @IsInt()
  @IsOptional()
  managerId?: number;
}
