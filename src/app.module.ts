import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthBarberModule } from './auth-barber/auth-barber.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { BarberModule } from './barbers/barber.module';
import { PrismaModule } from './lib/prisma.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [AuthBarberModule, AuthUserModule, BarberModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
