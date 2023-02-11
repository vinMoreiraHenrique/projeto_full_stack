/*
  Warnings:

  - Added the required column `senha` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataDeRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Cliente" ("dataDeRegistro", "email", "id", "nomeCompleto", "telefone") SELECT "dataDeRegistro", "email", "id", "nomeCompleto", "telefone" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_id_key" ON "Cliente"("id");
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
