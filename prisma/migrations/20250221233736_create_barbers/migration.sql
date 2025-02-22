-- CreateTable
CREATE TABLE "barbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "barbers_email_key" ON "barbers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "barbers_phone_key" ON "barbers"("phone");
