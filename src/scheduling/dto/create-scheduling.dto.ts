import { IsString, IsUUID, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateSchedulingDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @IsDateString()
  @IsNotEmpty()
  dayAt: Date;

  @IsString()
  @IsNotEmpty()
  hourAt: string;

  @IsString()
  @IsNotEmpty()
  serviceType: string;

  @IsString()
  status?: string;
}
