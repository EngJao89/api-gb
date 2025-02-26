import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { BarberService } from "src/barbers/barber.service";
import { PrismaModule } from "src/lib/prisma.module";
import { AuthBarberController } from "./auth-barber.controller";
import { AuthBarberService } from "./auth-barber.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    BarberService,
    PrismaModule,
  ],
  controllers: [AuthBarberController],
  providers: [AuthBarberService],
})
export class AuthBarberModule {}