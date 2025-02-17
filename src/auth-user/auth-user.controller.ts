import { Body, Controller, Post } from "@nestjs/common";

import { AuthUserRegisterDto } from "./dto/auth-register.dto";
import { AuthUserService } from "./auth-user.service";
import { UserService } from "src/users/user.service";

@Controller('auth')
export class AuthUserController {
  constructor(
    private readonly userService: UserService,
    private readonly authUserService: AuthUserService,
  ) {}

  @Post('register')
  async register(@Body() body: AuthUserRegisterDto) {
    return this.authUserService.register(body);
  }
}