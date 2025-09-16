import { IsString, IsUUID, IsDateString, IsNotEmpty } from 'class-validator';
import { IsFutureDate } from '../../validators/is-future-date.validator';

export class CreateSchedulingDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @IsDateString()
  @IsNotEmpty()
  @IsFutureDate({ message: 'A data do agendamento deve ser maior ou igual à data atual' })
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
