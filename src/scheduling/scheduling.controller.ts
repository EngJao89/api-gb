import { Body, Controller, Post } from "@nestjs/common";
import { SchedulingService } from "./scheduling.service";
import { CreateSchedulingDTO } from "./dto/create-scheduling.dto";


@Controller('scheduling')
export class SchedulingController {
  constructor( private readonly schedulingService: SchedulingService ) {}

  @Post()
  async create(@Body() data: CreateSchedulingDTO) {
    return this.schedulingService.create(data);
  }
}
