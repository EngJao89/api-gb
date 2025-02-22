/*
  Warnings:

  - Added the required column `password` to the `barbers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_barbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_barbers" ("email", "id", "name", "phone") SELECT "email", "id", "name", "phone" FROM "barbers";
DROP TABLE "barbers";
ALTER TABLE "new_barbers" RENAME TO "barbers";
CREATE UNIQUE INDEX "barbers_email_key" ON "barbers"("email");
CREATE UNIQUE INDEX "barbers_phone_key" ON "barbers"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
