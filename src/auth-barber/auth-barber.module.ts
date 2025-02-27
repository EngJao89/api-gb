import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { PrismaModule } from "src/lib/prisma.module";
import { AuthBarberController } from "./auth-barber.controller";
import { AuthBarberService } from "./auth-barber.service";
import { BarberModule } from "src/barbers/barber.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    BarberModule,
    PrismaModule,
  ],
  controllers: [AuthBarberController],
  providers: [AuthBarberService],
})
export class AuthBarberModule {}
