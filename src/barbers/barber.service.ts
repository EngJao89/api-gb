import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import { PrismaService } from "src/lib/prisma.service";

import { CreateBarberDTO } from "./dto/create-barber.dto";
import { UpdatePutBarberDTO } from "./dto/update-put-barber.dto";
import { UpdatePatchBarberDTO } from "./dto/update-patch-barber.dto";

@Injectable()
export class BarberService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(data: CreateBarberDTO) {
    const salt = await bcrypt.genSalt();
  
    data.password = await bcrypt.hash(data.password, salt);
  
    return this.prisma.barber.create({
      data,
    });
  }

  async list() {
    return this.prisma.barber.findMany();
  }

  async show(id: string) {
    return this.prisma.barber.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdatePutBarberDTO) {
    await this.exists(id);

    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    return this.prisma.barber.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePartial(id: string, data: UpdatePatchBarberDTO) {
    await this.exists(id);

    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    return this.prisma.barber.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const barber = await this.show(id);

    if (!barber) {
      throw new NotFoundException(`Barber ${id} not found`);
    }

    return this.prisma.barber.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.prisma.barber.count({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}