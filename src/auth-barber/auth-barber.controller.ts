import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";

import { Barber } from "src/decorators/barber.decorator";
import { AuthBarberGuard } from "./guard/auth-barber.guard";
import { AuthBarberService } from "./auth-barber.service";
import { FileService } from "src/file/file.service";
import { BarberData } from "src/interfaces/barber.interface";

import { AuthBarberLoginDto } from "./dto/auth-barber-login.dto";
import { AuthBarberForgetDto } from "./dto/auth-barber-forget.dto";
import { AuthBarberResetDto } from "./dto/auth-barber-reset.dto";
import { AuthBarberRegisterDto } from "./dto/auth-barber-register.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";

@Controller('auth-barber')
export class AuthBarberController {
  constructor(
    private readonly authBarberService: AuthBarberService,
    private readonly fileService: FileService,
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

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthBarberGuard)
  @Post('photo')
  async uploadPhoto(
    @Barber() barber,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const path = join(
      __dirname,
      '../',
      '..',
      'storage',
      'photos',
      `photo-${barber.id}.png`,
    );
  
    try {
      this.fileService.upload(photo, path);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return { success: true };
  }
}
