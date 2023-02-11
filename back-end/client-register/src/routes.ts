import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ClienteDTO, Contato, JwtPayload } from "./interfaces/clienteDTO";
import { Cliente } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const router = Router();



router.post("/cliente", async (req: Request, res: Response) => {
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
});

router.put(
  "/cliente/:id/contato/:idContato",
  async (req: Request, res: Response) => {
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
);

router.get("/cliente/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "your_secret") as JwtPayload;
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (decoded.id !== Number(id)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const cliente = await prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    return res.json(cliente);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/cliente/:id/contato", async (req: Request, res: Response) => {
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
});

router.post("/login", async (req: Request, res: Response) => {
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
});



export { router };
