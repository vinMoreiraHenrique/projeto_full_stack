import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ClienteDTO, Contato } from "./interfaces/clienteDTO";
import { Cliente } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.post("/cliente", async (req: Request, res: Response) => {
  const { nomeCompleto, email, telefone, contatos = [] }: ClienteDTO = req.body;

  const cliente = await prisma.cliente.create({
    data: {
      nomeCompleto,
      email,
      telefone,
      contatos
    },
  });
  return res.json(cliente);
});

router.get("/cliente/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const cliente = await prisma.cliente.findUnique({
        where: {
          id: Number(id),
        },
      })
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    return res.json(cliente);
  });

router.post("cliente/contato", async (req: Request, res: Response) => {
  const { contato } = req.body;
});

export { router };
