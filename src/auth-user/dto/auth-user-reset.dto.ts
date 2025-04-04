import { IsJWT, IsString, MinLength } from 'class-validator';

export class AuthUserResetDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsJWT()
  token: string;
}
