import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthUserController } from "./auth-user.controller";
import { AuthUserService } from "./auth-user.service";
import { UserModule } from "src/users/user.module";
import { PrismaModule } from "src/lib/prisma.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService],
})
export class AuthModule {}