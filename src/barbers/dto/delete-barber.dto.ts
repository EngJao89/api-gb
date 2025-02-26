import { IsString, IsUUID } from 'class-validator';

export class DeleteBarberDto {
  @IsString()
  @IsUUID()
  id: string;
}