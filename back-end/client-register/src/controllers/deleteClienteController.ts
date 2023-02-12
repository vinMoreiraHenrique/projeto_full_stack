import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const deleteClienteController = (req: Request, res: Response) => {
  const { id } = req.params;

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const decoded = jwt.verify(token, "your_secret") as JwtPayload;
  const clientId = decoded.id;

  if (Number(id) !== clientId) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const cliente = prisma.cliente.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(204).json(cliente);
};

export default deleteClienteController;
