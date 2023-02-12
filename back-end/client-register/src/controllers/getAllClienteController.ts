import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const gettAllClientesController = async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
      select: {
        nomeCompleto: true,
        email: true,
        telefone: true,
        dataDeRegistro: true,
        contatos: true
      },
    });

    return res.json(clientes);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default gettAllClientesController;
