import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthUserController } from "./auth-user.controller";
import { AuthUserService } from "./auth-user.service";
import { FileModule } from "src/file/file.module";
import { UserModule } from "src/users/user.module";
import { PrismaModule } from "src/lib/prisma.module";

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
    FileModule
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
