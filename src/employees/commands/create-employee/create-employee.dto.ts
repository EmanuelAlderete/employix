import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateContactInfoDto {

  /**
   * Número de telefone com DDD e código do país. Apenas números.
   * 
   * @example 5511999998888
   */
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  /**
   * Endereço de e-mail para contato com o usuário. Deve ser um e-mail válido.
   * 
   * @example user@service.com
   */
  @IsEmail()
  @IsOptional()
  email?: string;
}

export class CreateEmployeeDto {
  /**
   * Nome para o funcionário.
   * 
   * @example Uncle Bob
   */
  @IsString()
  name: string;

  /**
   * Chave identificadora para relação Many-to-one com Gerente.
   * 
   * @example 1
   */
  @IsInt()
  @IsOptional()
  managerId?: number;

  @IsOptional()
  @ValidateNested()
  contactInfo?: CreateContactInfoDto;
}
