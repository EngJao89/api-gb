import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import { PrismaService } from "src/lib/prisma.service";
import { CreateUserDTO } from "src/users/dto/create-user.dto";

@Injectable()
export class BarberService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(data: CreateUserDTO) {
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
}