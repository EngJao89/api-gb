import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './lib/prisma.module';
import { UserModule } from './users/user.module';
import { AuthUserModule } from './auth-user/auth-user.module';

@Module({
  imports: [PrismaModule, UserModule, AuthUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
