import { IsString,IsEmpty,IsEnum } from "class-validator";
export class CreateEmployeeDto{
    @IsString()
    @IsEmpty()
    name:string
    @IsEnum(['manager','employee'], {message: 'Valid role required'})
    role:'manager'|'employee'
    isActive:boolean
}