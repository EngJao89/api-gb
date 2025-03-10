import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/lib/prisma.service";
import { CreateSchedulingDTO } from "./dto/create-scheduling.dto";
import { UpdatePutSchedulingDTO } from "./dto/update-put-scheduling.dto";

@Injectable()
export class SchedulingService {
  constructor( private readonly prismaService: PrismaService ) {}

  async create (data: CreateSchedulingDTO) {
    return this.prismaService.scheduling.create({
      data,
    })
  }

  async list() {
    return this.prismaService.scheduling.findMany();
  }

  async show(id: string) {
    return this.prismaService.scheduling.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdatePutSchedulingDTO) {
    await this.exists(id);

    return this.prismaService.scheduling.update({
      data,
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.prismaService.scheduling.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`Scheduling ${id} not found`);
    }
  }
}
