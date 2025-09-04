// import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
// // import { CreateEmployeeDto } from './dto/create-employee.dto';
// // import { UpdateEmployeeDto } from './dto/update-employee.dto';
// import { Prisma } from '@prisma/client';
// import { DatabaseService } from 'prisma/DB/database.service';

// export interface Employee {
//   id: number;
//   name: string;
//   role: 'manager' | 'employee'; 
//   isActive: boolean;
// }

// @Injectable()
// export class EmployeesService {

//   constructor(private readonly databaseService: DatabaseService) {}
//   private employees: Employee[] = [
//     { id: 1, name: 'Chaya Rubin', role: 'manager', isActive: true },
//     { id: 2, name: 'Tzivi Rubin', role: 'employee', isActive: false },
//   ];

//   findAll(role?: 'manager' | 'employee'): Employee[] {
//     if (role) {
//       const rolesArray = this.employees.filter((employee) => employee.role === role);
//       if (rolesArray.length === 0) {
//         throw new NotFoundException('No employees found with the specified role');
//       }
//       return rolesArray;
//     }
//     return this.employees;
//   }

//   findOne(id: number): Employee {
//     const employee = this.employees.find((employee) => employee.id === id);
//     if (!employee) {
//       throw new NotAcceptableException('Employee not found');
//     }
//     return employee;
//   }

//   create(createEmployeeDto: CreateEmployeeDto): Employee {
//     const employeesByHighestId = [...this.employees].sort((a, b) => b.id - a.id);
//     const newEmployee: Employee = {
//       id: employeesByHighestId[0].id + 1,
//       ...createEmployeeDto,
//     };
//     this.employees.push(newEmployee);
//     return newEmployee;
//   }

//   update(id: number, updateEmployeeDto: UpdateEmployeeDto): Employee {
//     this.employees = this.employees.map((employee) => {
//       if (employee.id === id) {
//         return { ...employee, ...updateEmployeeDto };
//       }
//       return employee;
//     });
//     return this.findOne(id);
//   }

//   delete(id: number): Employee {
//     const removedEmployee = this.findOne(id);
//     this.employees = this.employees.filter((employee) => employee.id !== id);
//     return removedEmployee;
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Employee } from '@prisma/client';
import { DatabaseService } from 'prisma/DB/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Employee[]> {
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.databaseService.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  async create(createEmployeeDto: Prisma.EmployeeUncheckedCreateInput): Promise<Employee> {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput): Promise<Employee> {
    return this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async delete(id: number): Promise<Employee> {
    return this.databaseService.employee.delete({
      where: { id },
    });
  }
}
