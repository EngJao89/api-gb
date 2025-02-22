-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_barbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_barbers" ("email", "id", "name", "password", "phone") SELECT "email", "id", "name", "password", "phone" FROM "barbers";
DROP TABLE "barbers";
ALTER TABLE "new_barbers" RENAME TO "barbers";
CREATE UNIQUE INDEX "barbers_email_key" ON "barbers"("email");
CREATE UNIQUE INDEX "barbers_phone_key" ON "barbers"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
