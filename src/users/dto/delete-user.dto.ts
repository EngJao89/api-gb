import { IsString, IsUUID } from 'class-validator';

export class DeleteUserDto {
  @IsString()
  @IsUUID()
  id: string;
}
