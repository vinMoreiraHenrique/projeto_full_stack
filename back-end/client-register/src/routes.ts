import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ClienteDTO, Contato, JwtPayload } from "./interfaces/clienteDTO";
import { Cliente } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createClienteController from "./controllers/createClienteController";
import updateClienteController from "./controllers/updateClienteController";

import gettAllClientesController from "./controllers/getAllClienteController";
import createClienteContatoController from "./controllers/createClienteContatoController";
import deleteClienteController from "./controllers/deleteClienteController";
import createClienteLoginController from "./controllers/createClienteLoginController";

const prisma = new PrismaClient();

const router = Router();

router.post("/cliente", createClienteController);

router.put("/cliente/:id/contato/:idContato", updateClienteController);

router.get("/cliente", gettAllClientesController);

router.post("/cliente/:id/contato", createClienteContatoController);

router.post("/login", createClienteLoginController);

router.post("/cliente/:id", deleteClienteController)

export { router };
