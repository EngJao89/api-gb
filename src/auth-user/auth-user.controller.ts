import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { AuthUserGuard } from "./guard/auth-user.guard";
import { User } from "src/decorators/user.decorator";

import { AuthUserService } from "./auth-user.service";
import { UserService } from "src/users/user.service";

import { AuthUserRegisterDto } from "./dto/auth-user-register.dto";
import { AuthUserLoginDto } from "./dto/auth-user-login.dto";
import { AuthUserForgetDto } from "./dto/auth-user-forget.dto";
import { AuthUserResetDto } from "./dto/auth-user-reset.dto";
import { UserData } from "src/interfaces/user.interface";

@Controller('auth-user')
export class AuthUserController {
  constructor(
    private readonly userService: UserService,
    private readonly authUserService: AuthUserService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthUserLoginDto) {
    return await this.authUserService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthUserRegisterDto) {
    return this.authUserService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthUserForgetDto) {
    return this.authUserService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthUserResetDto) {
    return this.authUserService.reset(password, token);
  }

  @UseGuards(AuthUserGuard)
  @Post('me')
  async getPartialData(
    @User(['id', 'name', 'email', 'phone'])
    partialData: Partial<UserData>,
  ) {
    return partialData;
  }

}