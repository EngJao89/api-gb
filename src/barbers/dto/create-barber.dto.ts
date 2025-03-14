import {
  IsEmail,
  IsMobilePhone,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateBarberDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phone: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @IsString()
  barbershop: string;
}