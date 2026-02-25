/*
  Warnings:

  - A unique constraint covering the columns `[barberId,dayAt]` on the table `schedulings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "uniq_schedulings_barber_dayAt" ON "schedulings"("barberId", "dayAt");
