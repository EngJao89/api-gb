import { Body, Controller, Post } from "@nestjs/common";

import { BarberService } from "./barber.service";
import { CreateUserDTO } from "src/users/dto/create-user.dto";

@Controller('barbers')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.barberService.create(data);
  }
}
