import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

import { User } from "@prisma/client";

import { PrismaService } from "src/lib/prisma.service";
import { UserService } from "src/users/user.service";
import { AuthUserRegisterDto } from "./dto/auth-register.dto";

@Injectable()
export class AuthUserService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
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

  async register(data: AuthUserRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
