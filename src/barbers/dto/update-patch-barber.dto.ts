import { PartialType } from '@nestjs/mapped-types';
import { CreateBarberDTO } from './create-barber.dto';

export class UpdatePatchBarberDTO extends PartialType(CreateBarberDTO) {}
