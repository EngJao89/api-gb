import { Body, Controller, Get, Patch, Post, Put } from "@nestjs/common";

import { BarberAvailabilityService } from "./barber-availability.service";
import { ParamId } from "src/decorators/param-id.decorator";

import { CreateBarberAvailabilityDTO } from "./dto/create-barber-availability.dto";
import { UpdatePutBarberAvailabilityDTO } from "./dto/update-put-barber-availability.dto";
import { UpdatePatchBarberAvailabilityDTO } from "./dto/update-patch-barber-availability.dto";

@Controller('barber-availability')
export class BarberAvailabilityController {
  constructor( private readonly barberAvailabilityService: BarberAvailabilityService ) {}

  @Post()
  async create(@Body() data: CreateBarberAvailabilityDTO) {
    return this.barberAvailabilityService.create(data);
  }

  @Get()
  async read() {
    return this.barberAvailabilityService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: string) {
    return this.barberAvailabilityService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutBarberAvailabilityDTO, @ParamId() id: string) {
    return this.barberAvailabilityService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchBarberAvailabilityDTO,
    @ParamId() id: string,
  ) {
    return this.barberAvailabilityService.updatePartial(id, data);
  }
}