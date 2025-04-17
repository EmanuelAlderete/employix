import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './commands/create-employee/create-employee.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetEmployeeQuery } from './queries/get-employee/get-employee.query';
import { plainToClass } from 'class-transformer';
import { CreateEmployeeCommand } from './commands/create-employee/create-employee.command';
import { UpdateEmployeeCommand } from './commands/update-employee/update-employee.command';
import { UpdateEmployeeDto } from './commands/update-employee/update-employee.dto';
import { AssignManagerDto } from './commands/assign-manager/assign-manager.dto';
import { AssignManagerCommand } from './commands/assign-manager/assign-manager.command';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

   /**
    * Cria uma nova entidade no sistema com nome, gerente e informações de contato.
   */
  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    const command = plainToClass(CreateEmployeeCommand, dto);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const id = await this.commandBus.execute(command);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const query = plainToClass(GetEmployeeQuery, { id });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.queryBus.execute(query);
  }


 /**
    * Retorna os dados completos de uma entidade existente com base no ID informado.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = plainToClass(GetEmployeeQuery, { id: Number(id) });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const employee = await this.queryBus.execute(query);
    if (!employee) throw new NotFoundException();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return employee;
  }

  /**
    * Atualiza os dados de uma entidade existente com base no ID informado.
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    const command = plainToClass(UpdateEmployeeCommand, {
      ...dto,
      id: Number(id),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const affectedRows = await this.commandBus.execute(command);
    if (!affectedRows) throw new NotFoundException();

    const query = plainToClass(GetEmployeeQuery, { id });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.queryBus.execute(query);
  }

  /**
    * Define um gerente para um funcionário existente com base no ID informado.
   */
  @Patch(':id/assign-manager')
  async assignManager(@Param('id') id: string, @Body() dto: AssignManagerDto) {
    const command = plainToClass(AssignManagerCommand, {
      ...dto,
      id: Number(id),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const affectedRows = await this.commandBus.execute(command);
    if (!affectedRows) throw new NotFoundException();

    const query = plainToClass(GetEmployeeQuery, { id });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.queryBus.execute(query);
  }
}
