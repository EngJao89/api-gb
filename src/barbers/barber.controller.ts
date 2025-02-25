import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Put
} from "@nestjs/common";

import { ParamId } from "src/decorators/param-id.decorator";
import { BarberService } from "./barber.service";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { UpdatePutBarberDTO } from "./dto/update-put-barber.dto";

@Controller('barbers')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.barberService.create(data);
  }

  @Get()
  async read() {
    return this.barberService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: string) {
    return this.barberService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutBarberDTO, @ParamId() id: string) {
    return this.barberService.update(id, data);
  }
}
