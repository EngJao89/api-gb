import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { PrismaModule } from "src/lib/prisma.module";
import { AuthBarberController } from "./auth-barber.controller";
import { AuthBarberService } from "./auth-barber.service";
import { BarberModule } from "src/barbers/barber.module";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
    }),
    BarberModule,
    PrismaModule,
  ],
  controllers: [AuthBarberController],
  providers: [AuthBarberService],
})
export class AuthBarberModule {}
