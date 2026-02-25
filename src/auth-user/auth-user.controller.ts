import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';

import { User } from 'src/decorators/user.decorator';
import { FileService } from 'src/file/file.service';
import { UserData } from 'src/interfaces/user.interface';
import { UserService } from 'src/users/user.service';
import { AuthUserGuard } from './guard/auth-user.guard';
import { AuthUserService } from './auth-user.service';
import { AuthUserForgetDto } from './dto/auth-user-forget.dto';
import { AuthUserLoginDto } from './dto/auth-user-login.dto';
import { AuthUserRegisterDto } from './dto/auth-user-register.dto';
import { AuthUserResetDto } from './dto/auth-user-reset.dto';

@ApiTags('auth-user')
@Controller('auth-user')
export class AuthUserController {
  constructor(
    private readonly userService: UserService,
    private readonly authUserService: AuthUserService,
    private readonly fileService: FileService,
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

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthUserGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user,
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
      `photo-${user.id}.png`,
    );

    try {
      this.fileService.upload(photo, path);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return { success: true };
  }

}