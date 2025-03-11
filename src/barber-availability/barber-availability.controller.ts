import { Body, Controller, Get, Post } from "@nestjs/common";
import { BarberAvailabilityService } from "./barber-availability.service";
import { CreateBarberAvailabilityDTO } from "./dto/create-barber-availability.dto";

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
}