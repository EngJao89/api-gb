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
  
    return this.prisma.user.create({
      data,
    });
  }
}