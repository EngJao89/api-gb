import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";

import { PrismaService } from "src/lib/prisma.service";

import { CreateSchedulingDTO } from "./dto/create-scheduling.dto";
import { UpdatePutSchedulingDTO } from "./dto/update-put-scheduling.dto";
import { UpdatePatchSchedulingDTO } from "./dto/update-patch-scheduling.dto";

@Injectable()
export class SchedulingService {
  constructor( private readonly prismaService: PrismaService ) {}

  private validateDate(date: Date): void {
    const inputDate = new Date(date);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      throw new BadRequestException('A data do agendamento deve ser maior ou igual à data atual');
    }
  }

  async create (data: CreateSchedulingDTO) {
    this.validateDate(data.dayAt);
    
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
    
    if (data.dayAt) {
      this.validateDate(data.dayAt);
    }

    return this.prismaService.scheduling.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePartial(id: string, data: UpdatePatchSchedulingDTO) {
    await this.exists(id);
    
    if (data.dayAt) {
      this.validateDate(data.dayAt);
    }

    return this.prismaService.scheduling.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const scheduling = await this.show(id);

    if (!scheduling) {
      throw new NotFoundException(`Scheduling ${id} not found`);
    }

    return this.prismaService.scheduling.delete({
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
