import { 
  BadRequestException, 
  Injectable, 
  UnauthorizedException 
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Barber } from "@prisma/client";
import * as bcrypt from 'bcrypt';

import { BarberService } from "src/barbers/barber.service";
import { PrismaService } from "src/lib/prisma.service";

@Injectable()
export class AuthBarberService {
  private issuer = 'login';
  private audience = 'barbers';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    // private readonly barberService: BarberService,
  ) {}

  createToken(barber: Barber) {
    return {
      accessToken: this.jwtService.sign(
        {
          sub: barber.id,
          name: barber.name,
          email: barber.email,
        },
        {
          expiresIn: '24h',
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

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

  async login(email: string, password: string) {
    const ong = await this.prisma.barber.findFirst({
      where: { email: email },
    });

    if (!ong || !(await bcrypt.compare(password, ong.password))) {
      throw new UnauthorizedException(
        'Incorrect email or password. Please check your settings',
      );
    }

    return this.createToken(ong);
  }

  async forget(email: string) {
    const ong = await this.prisma.barber.findFirst({
      where: { email },
    });

    if (!ong) {
      throw new UnauthorizedException('Incorrect  email.');
    }

    return this.createToken(ong);
  }
}
