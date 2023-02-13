# Sistema de Cadastro de Clientes
Este projeto é um sistema de cadastro de clientes onde os clientes podem fazer login e cadastrar seus contatos.

## Instalação

### Yarn
1. Instale as dependências do projeto indo até a pasta raiz de cada parte do projeto, tal como "back-end" ou "front-end" com o comando `yarn install`
2. Configure a sua chave secreta no arquivo `.env` adicionando a seguinte linha: `secret key = secret`.
3. Rode o comando `yarn dev` para iniciar o servidor em modo de desenvolvimento.

### NPM
1. Instale as dependências do projeto indo até a pasta raiz de cada parte do projeto, tal como "back-end" ou "front-end" com o comando `npm install`
2. Configure a sua chave secreta no arquivo `.env` adicionando a seguinte linha: `secret key = secret`.
3. Rode o comando `npm run dev` para iniciar o servidor em modo de desenvolvimento.

## Dependências
Este projeto utiliza as seguintes dependências:
- @prisma/client
- @types/express
- @types/node
- bcrypt
- express
- jsonwebtoken
- prisma
- ts-node
- typescript
- @types/bcrypt
- @types/jsonwebtoken

## Tecnologias
Este projeto foi desenvolvido com as seguintes tecnologias:
- TypeScript
- Node.js
- Express
- Prisma

## Scripts
Este projeto possui o seguinte script disponível:
- dev: Inicia o servidor em modo de desenvolvimento com o comando `nodemon src/server.ts`.

## Dev Dependencies
Este projeto possui as seguintes dependências de desenvolvimento:
- sucrase