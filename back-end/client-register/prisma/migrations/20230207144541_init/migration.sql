-- CreateTable
CREATE TABLE "Cliente" (
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataDeRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Contato" (
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataDeRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteEmail" TEXT,
    CONSTRAINT "Contato_clienteEmail_fkey" FOREIGN KEY ("clienteEmail") REFERENCES "Cliente" ("email") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contato_email_key" ON "Contato"("email");
