import { PartialType } from '@nestjs/mapped-types';
import { CreateSchedulingDTO } from './create-scheduling.dto';

export class UpdatePatchSchedulingDTO extends PartialType(CreateSchedulingDTO) {}
