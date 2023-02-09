/*
  Warnings:

  - Added the required column `id` to the `Contato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataDeRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteEmail" TEXT,
    CONSTRAINT "Contato_clienteEmail_fkey" FOREIGN KEY ("clienteEmail") REFERENCES "Cliente" ("email") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Contato" ("clienteEmail", "dataDeRegistro", "email", "nomeCompleto", "telefone") SELECT "clienteEmail", "dataDeRegistro", "email", "nomeCompleto", "telefone" FROM "Contato";
DROP TABLE "Contato";
ALTER TABLE "new_Contato" RENAME TO "Contato";
CREATE UNIQUE INDEX "Contato_email_key" ON "Contato"("email");
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataDeRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Cliente" ("dataDeRegistro", "email", "nomeCompleto", "telefone") SELECT "dataDeRegistro", "email", "nomeCompleto", "telefone" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
