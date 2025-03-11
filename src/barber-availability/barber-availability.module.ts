import { Module } from "@nestjs/common";
import { BarberAvailabilityService } from "./barber-availability.service";
import { BarberAvailabilityController } from "./barber-availability.controller";
import { PrismaModule } from "src/lib/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BarberAvailabilityController],
  providers: [BarberAvailabilityService],
  exports: [BarberAvailabilityModule],
})
export class BarberAvailabilityModule {}