

export interface ClienteDTO {
  nomeCompleto: string;
  email: string;
  telefone: string;
  contatos?: Contato[];
}

export interface Contato {
  nomeCompleto: string;
  email: string;
  telefone: string;
}