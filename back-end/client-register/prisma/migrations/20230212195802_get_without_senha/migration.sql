-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataDeRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" INTEGER,
    CONSTRAINT "Contato_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contato" ("clienteId", "dataDeRegistro", "email", "id", "nomeCompleto", "telefone") SELECT "clienteId", "dataDeRegistro", "email", "id", "nomeCompleto", "telefone" FROM "Contato";
DROP TABLE "Contato";
ALTER TABLE "new_Contato" RENAME TO "Contato";
CREATE UNIQUE INDEX "Contato_email_key" ON "Contato"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
