import { Body, Controller, Post } from "@nestjs/common";

import { AuthBarberService } from "./auth-barber.service";
import { BarberService } from "src/barbers/barber.service";
import { AuthBarberLoginDto } from "./dto/auth-barber-login.dto";
import { AuthBarberForgetDto } from "./dto/auth-barber-forget.dto";

@Controller('auth-barber')
export class AuthBarberController {
  constructor(
    // private readonly barberService: BarberService,
    private readonly authBarberService: AuthBarberService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthBarberLoginDto) {
    return await this.authBarberService.login(email, password);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthBarberForgetDto) {
    return this.authBarberService.forget(email);
  }
}