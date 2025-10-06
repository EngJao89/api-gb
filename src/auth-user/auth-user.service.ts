import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

import { User } from "@prisma/client";

import { PrismaService } from "src/lib/prisma.service";
import { UserService } from "src/users/user.service";
import { AuthUserRegisterDto } from "./dto/auth-user-register.dto";

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

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (_e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        'Incorrect email or password. Please check your settings',
      );
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect  email.');
    }

    return this.createToken(user);
  }

  async reset(password: string, _token: string) {
    const id = '';

    const user = await this.prisma.user.update({
      where: { id },
      data: { password },
    });

    return this.createToken(user);
  }

  async register(data: AuthUserRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
