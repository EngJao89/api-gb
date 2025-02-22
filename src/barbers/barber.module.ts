import { Module } from "@nestjs/common";
import { PrismaModule } from "src/lib/prisma.module";
import { BarberController } from "./barber.controller";
import { BarberService } from "./barber.service";

@Module({
  imports: [PrismaModule],
  controllers: [BarberController],
  providers: [BarberService],
  exports: [BarberService],
})
export class BarberModule {}
