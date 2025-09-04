import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeesService } from './employee.service';
import { DatabaseModule} from '../prisma/DB/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
