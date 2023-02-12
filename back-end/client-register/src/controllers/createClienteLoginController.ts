import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

const createClienteLoginController = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const cliente = await prisma.cliente.findUnique({
      where: {
        email,
      },
    });

    if (!cliente) {
      return res.status(400).json({ error: "Email ou senha estão incorretos" });
    }

    const passwordMatch = bcrypt.compareSync(senha, cliente.senha);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Email ou senha estão incorretos" });
    }

    const token = jwt.sign(
      {
        id: cliente.id,
        email: cliente.email,
      },
      process.env.JWT_SECRET || "your-secret",
      {
        expiresIn: "1d",
      }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default createClienteLoginController;