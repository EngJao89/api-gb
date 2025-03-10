import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/lib/prisma.service";
import { CreateSchedulingDTO } from "./dto/create-scheduling.dto";

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
}
