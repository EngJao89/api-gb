import { IsString, IsUUID } from 'class-validator';

export class DeleteBarberAvailabilityDTO {
  @IsString()
  @IsUUID()
  id: string;
}