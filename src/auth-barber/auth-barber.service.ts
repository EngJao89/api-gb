import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { BarberService } from "src/barbers/barber.service";
import { PrismaService } from "src/lib/prisma.service";

@Injectable()
export class AuthBarberService {
  private issuer = 'login';
  private audience = 'ongs';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly barberService: BarberService,
  ) {}

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}