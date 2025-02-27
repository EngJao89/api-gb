import { IsEmail } from 'class-validator';

export class AuthBarberForgetDto {
  @IsEmail()
  email: string;
}
