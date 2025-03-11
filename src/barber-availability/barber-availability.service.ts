import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/lib/prisma.service";
import { CreateBarberAvailabilityDTO } from "./dto/create-barber-availability.dto";

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
}
