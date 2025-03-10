import { IsString, IsUUID } from 'class-validator';

export class DeleteSchedulingDTO {
  @IsString()
  @IsUUID()
  id: string;
}