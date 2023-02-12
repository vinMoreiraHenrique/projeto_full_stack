import { Request, Response } from "express";
import { ClienteDTO } from "../interfaces/clienteDTO";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

const createClienteController = async (req: Request, res: Response) => {
    try {
        const { nomeCompleto, email, telefone, senha }: ClienteDTO = req.body;
    
        if (!nomeCompleto || !email || !telefone || !senha) {
          return res.status(400).json({ error: "Dados incompletos" });
        }
    
        const hashedPass = await bcrypt.hash(senha, 10);
    
        const cliente = await prisma.cliente.create({
          data: {
            nomeCompleto,
            email,
            telefone,
            senha: hashedPass,
          },
        });
    
        const clienteSemSenha = { ...cliente, senha: undefined };
    
        return res.json(clienteSemSenha);
      } catch (error) {
        return res.status(500).json({ error: "Erro ao criar cliente" });
      }
}

export default createClienteController;