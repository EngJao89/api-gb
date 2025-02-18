import { IsEmail } from 'class-validator';

export class AuthUserForgetDto {
  @IsEmail()
  email: string;
}
