import { PartialType } from "@nestjs/mapped-types"
import { CreateBarberAvailabilityDTO } from "./create-barber-availability.dto";

export class UpdatePatchBarberAvailabilityDTO extends PartialType(CreateBarberAvailabilityDTO) {}
