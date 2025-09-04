import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeesService } from './employee.service';

describe('employeeController', () => {
  let employeeController: EmployeeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeesService],
    }).compile();

    employeeController = app.get<EmployeeController>(EmployeeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(employeeController.d()).toBe('Hello World!');
    });
  });
});   
