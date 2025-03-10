import { Body, Controller, Get, Post } from "@nestjs/common";
import { ParamId } from "src/decorators/param-id.decorator";
import { SchedulingService } from "./scheduling.service";
import { CreateSchedulingDTO } from "./dto/create-scheduling.dto";

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
}
