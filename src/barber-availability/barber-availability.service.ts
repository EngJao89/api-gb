import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/lib/prisma.service";

import { CreateBarberAvailabilityDTO } from "./dto/create-barber-availability.dto";
import { UpdatePutBarberAvailabilityDTO } from "./dto/update-put-barber-availability.dto";
import { UpdatePatchBarberAvailabilityDTO } from "./dto/update-patch-barber-availability.dto";

@Injectable()
export class BarberAvailabilityService {
  constructor( private readonly prismaService: PrismaService ) {}

  private convertDayAtToDateTime(dayAt: Date | string | undefined): Date | undefined {
    if (!dayAt) return undefined;
    return typeof dayAt === 'string' 
      ? new Date(dayAt + 'T00:00:00.000Z')
      : dayAt;
  }

  async create (data: CreateBarberAvailabilityDTO) {
    const barberExists = await this.prismaService.barber.findUnique({
      where: { id: data.barberId },
    });

    if (!barberExists) {
      throw new NotFoundException('Barber not found');
    }

    return this.prismaService.barberAvailability.create({
      data: {
        ...data,
        dayAt: this.convertDayAtToDateTime(data.dayAt) as Date,
      },
    })
  }

  async list() {
    return this.prismaService.barberAvailability.findMany();
  }

  async show(id: string) {
    return this.prismaService.barberAvailability.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdatePutBarberAvailabilityDTO) {
    await this.exists(id);
  
    const convertedDayAt = this.convertDayAtToDateTime(data.dayAt);
    const updateData = convertedDayAt 
      ? { ...data, dayAt: convertedDayAt }
      : data;

    return this.prismaService.barberAvailability.update({
      data: updateData,
      where: {
        id,
      },
    });
  }

  async updatePartial(id: string, data: UpdatePatchBarberAvailabilityDTO) {
    await this.exists(id);

    const convertedDayAt = this.convertDayAtToDateTime(data.dayAt);
    const updateData = convertedDayAt 
      ? { ...data, dayAt: convertedDayAt }
      : data;

    return this.prismaService.barberAvailability.update({
      data: updateData,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const barberAvailability = await this.show(id);

    if (!barberAvailability) {
      throw new NotFoundException(`Scheduling ${id} not found`);
    }

    return this.prismaService.barberAvailability.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.prismaService.barberAvailability.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`Barber Availability ${id} not found`);
    }
  }
}
