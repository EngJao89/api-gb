import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateBarberAvailabilityDTO {
  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @IsDateString()
  @IsNotEmpty()
  dayAt: Date;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;
}
