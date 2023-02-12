import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Contato } from "../interfaces/clienteDTO";

const prisma = new PrismaClient();

const createClienteContatoController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nomeCompleto, email, telefone }: Contato = req.body;
  
    const contato = await prisma.cliente.update({
      where: {
        id: Number(id),
      },
      data: {
        contatos: {
          create: {
            nomeCompleto: nomeCompleto,
            email: email,
            telefone: telefone,
          },
        },
      },
    });
    const updatedCliente = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        contatos: true,
      },
    });
    return res.json(updatedCliente);
  };
  
  export default createClienteContatoController;