import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthUserController } from "./auth-user.controller";
import { AuthUserService } from "./auth-user.service";
import { UserModule } from "src/users/user.module";
import { PrismaModule } from "src/lib/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

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
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
