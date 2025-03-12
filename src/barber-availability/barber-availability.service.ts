import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/lib/prisma.service";
import { CreateBarberAvailabilityDTO } from "./dto/create-barber-availability.dto";
import { UpdatePutBarberAvailabilityDTO } from "./dto/update-put-barber-availability.dto";

@Injectable()
export class BarberAvailabilityService {
  constructor( private readonly prismaService: PrismaService ) {}

  async create (data: CreateBarberAvailabilityDTO) {
    const barberExists = await this.prismaService.barber.findUnique({
      where: { id: data.barberId },
    });

    if (!barberExists) {
      throw new NotFoundException('Barber not found');
    }

    return this.prismaService.barberAvailability.create({
      data,
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
  
    return this.prismaService.barberAvailability.update({
      data,
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
