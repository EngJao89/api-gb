import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { Barber } from "src/decorators/barber.decorator";
import { AuthBarberGuard } from "./guard/auth-barber.guard";
import { AuthBarberService } from "./auth-barber.service";

import { AuthBarberLoginDto } from "./dto/auth-barber-login.dto";
import { AuthBarberForgetDto } from "./dto/auth-barber-forget.dto";
import { AuthBarberResetDto } from "./dto/auth-barber-reset.dto";
import { AuthBarberRegisterDto } from "./dto/auth-barber-register.dto";
import { BarberData } from "src/interfaces/barber.interface";

@Controller('auth-barber')
export class AuthBarberController {
  constructor(
    private readonly authBarberService: AuthBarberService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthBarberLoginDto) {
    return await this.authBarberService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthBarberRegisterDto) {
    return this.authBarberService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthBarberForgetDto) {
    return this.authBarberService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthBarberResetDto) {
    return this.authBarberService.reset(password, token);
  }

    @UseGuards(AuthBarberGuard)
    @Post('me')
    async getPartialData(
      @Barber(['id', 'name', 'email', 'phone', 'barbershop'])
      partialData: Partial<BarberData>,
    ) {
      return partialData;
    }
}
