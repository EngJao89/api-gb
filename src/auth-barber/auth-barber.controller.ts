import { Body, Controller, Post } from "@nestjs/common";

import { AuthBarberService } from "./auth-barber.service";
import { BarberService } from "src/barbers/barber.service";
import { AuthBarberLoginDto } from "./dto/auth-barber-login.dto";

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
}