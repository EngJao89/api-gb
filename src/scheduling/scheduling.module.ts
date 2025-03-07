import { Module } from "@nestjs/common";
import { SchedulingService } from "./scheduling.service";
import { SchedulingController } from "./scheduling.controller";
import { PrismaModule } from "src/lib/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SchedulingController],
  providers: [SchedulingService],
  exports: [SchedulingModule],
})
export class SchedulingModule {}
