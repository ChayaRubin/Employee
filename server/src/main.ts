import { NestFactory } from '@nestjs/core';
import { EmployeesModule}from './employee.module'

async function bootstrap() {
  const app = await NestFactory.create(EmployeesModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();