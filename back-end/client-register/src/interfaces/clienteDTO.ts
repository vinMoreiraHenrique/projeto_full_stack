

export interface ClienteDTO {
  nomeCompleto: string;
  email: string;
  telefone: string;
  senha: string;
  contatos?: Contato[];
}

export interface Contato {
  clienteId: number | { connect: { id: number } };
  nomeCompleto: string;
  email: string;
  telefone: string;
}

export interface JwtPayload {
  id: number;
}