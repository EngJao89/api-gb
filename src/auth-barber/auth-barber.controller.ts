import { Body, Controller, Post } from "@nestjs/common";

import { AuthBarberService } from "./auth-barber.service";
import { AuthBarberLoginDto } from "./dto/auth-barber-login.dto";
import { AuthBarberForgetDto } from "./dto/auth-barber-forget.dto";
import { AuthBarberResetDto } from "./dto/auth-barber-reset.dto";

@Controller('auth-barber')
export class AuthBarberController {
  constructor(
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

  @Post('reset')
  async reset(@Body() { password, token }: AuthBarberResetDto) {
    return this.authBarberService.reset(password, token);
  }
}