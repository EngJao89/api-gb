import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthBarberModule } from './auth-barber/auth-barber.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { BarberModule } from './barbers/barber.module';
import { PrismaModule } from './lib/prisma.module';
import { UserModule } from './users/user.module';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [
    AuthBarberModule, 
    AuthUserModule, 
    BarberModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule, 
    SchedulingModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
