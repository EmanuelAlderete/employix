import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetEmployeeQuery } from './queries/get-employee/get-employee.query';
import { plainToClass } from 'class-transformer';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  // @Post()
  // async create(@Body() dto: CreateEmployeeDto) {
  //   const command = plainToClass(CreateEmployeeCommand, dto);
  //   const id = await this.commandBus.execute(command);
  //   const query = plainToClass(GetEmployeeQuery, { id });

  //   return this.queryBus.execute(query);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = plainToClass(GetEmployeeQuery, { id: Number(id) });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const employee = await this.queryBus.execute(query);
    if (!employee) throw new NotFoundException();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return employee;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return null;
  }
}
