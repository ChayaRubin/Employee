// import { Controller, Get, Param, ParseIntPipe,Post,Body,Patch,Delete, Query } from '@nestjs/common';
// import { EmployeesService } from './employee.service';
// // import { CreateEmployeeDto } from './dto/create-employee.dto'
// // import { UpdateEmployeeDto } from './dto/update-employee.dto';
// import { Prisma } from '@prisma/client';
// @Controller('employees')
// export class EmployeeController {
//   constructor(private readonly employeesService: EmployeesService) {}
// @Get("hello")
// d() {
//   return 'Hello World!';
// }

//   @Get()
//   getAll(@Query('role') role?: 'manager' | 'employee'){
//     return this.employeesService.findAll(role);
//   }

//   @Get(':id')
//   getOne(@Param('id',ParseIntPipe) id:number){
//     return this.employeesService.findOne(id);
//   }

//   @Post()
//   create(@Body() createUserDto:Prisma.EmployeeUncheckedCreateInput){
//     return this.employeesService.create(createUserDto);
//   }
 
//   @Patch(':id')
//   update(@Param('id',ParseIntPipe) id:number, @Body() updateUserDto:Prisma.EmployeeUpdateInput){
//     return this.employeesService.update(id,updateUserDto);
//   }

//   @Delete(':id')
//   delete(@Param('id',ParseIntPipe) id:number){
//     return this.employeesService.delete(id);

//   }
// }
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employee.service';
import { Prisma } from '@prisma/client';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('hello')
  d() {
    return 'Hello World!';
  }

  @Get()
  getAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: Prisma.EmployeeUncheckedCreateInput) {
    return this.employeesService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.delete(id);
  }
}
