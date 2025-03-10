import { Body, Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";

import { ParamId } from "src/decorators/param-id.decorator";
import { SchedulingService } from "./scheduling.service";

import { CreateSchedulingDTO } from "./dto/create-scheduling.dto";
import { UpdatePutSchedulingDTO } from "./dto/update-put-scheduling.dto";
import { UpdatePatchSchedulingDTO } from "./dto/update-patch-scheduling.dto";

@Controller('scheduling')
export class SchedulingController {
  constructor( private readonly schedulingService: SchedulingService ) {}

  @Post()
  async create(@Body() data: CreateSchedulingDTO) {
    return this.schedulingService.create(data);
  }

  @Get()
  async read() {
    return this.schedulingService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: string) {
    return this.schedulingService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutSchedulingDTO, @ParamId() id: string) {
    return this.schedulingService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchSchedulingDTO,
    @ParamId() id: string,
  ) {
    return this.schedulingService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.schedulingService.delete(id);
  }
}
