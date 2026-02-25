import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ParamId } from 'src/decorators/param-id.decorator';
import { BarberService } from './barber.service';
import { CreateBarberDTO } from './dto/create-barber.dto';
import { UpdatePutBarberDTO } from './dto/update-put-barber.dto';
import { UpdatePatchBarberDTO } from './dto/update-patch-barber.dto';

@ApiTags('barbers')
@Controller('barbers')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Post()
  async create(@Body() data: CreateBarberDTO) {
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

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchBarberDTO, @ParamId() id: string) {
    return this.barberService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.barberService.delete(id);
  }
}
