import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Contato, JwtPayload } from "../interfaces/clienteDTO";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

const updateClienteController = async (req: Request, res: Response) => {
    const { id, idContato } = req.params;
    const { nomeCompleto, email, telefone }: Contato = req.body;

    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    try {
      const decoded = jwt.verify(token, "your_secret") as JwtPayload;
      const clientId = decoded.id;

      if (Number(id) !== clientId) {
        return res.status(401).json({ error: "Não autorizado" });
      }

      const cliente = await prisma.cliente.update({
        where: {
          id: Number(id),
        },
        data: {
          contatos: {
            update: {
              where: {
                id: Number(idContato),
              },
              data: {
                nomeCompleto,
                email,
                telefone,
              },
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
    } catch (error) {
      return res.status(401).json({ error: "Não autorizado" });
    }
  }

  export default updateClienteController;