# Smoke Track API

### Descrição

Smoke Track é uma Aplicação de Gestão Empresarial (ERP - Enterprise Resource Planning) desenvolvido em Node.js utilizando o framework Nest.js, destinado à gestão de vendas e estoque de uma empresa.

O serviço disponibiliza soluções para:

- Cadastro de usuários: gestão dos usuários do sistema com login e senha para acesso,
- Cadastro de vendas: registro de vendas efetuadas na loja.
- Cadastro de produtos: registro dos produtos disponíveis para venda.
- Gerenciamento de estoque: endpoints dedicados à administração do estoque da loja.

### Tecnologias Utilizadas:

- Node.js - ambiente de desenvolvimento.
- Nest.js - Framework para criação da API.
- PostgreSQL - banco de dados relacional.
- TypeORM - ORM para mapeamento de entidades no banco de dados.
- ESLint - para padronização e qualidade do código.
- Swagger - para documentação interativa das APIs.
- Supertest - para realização de teste e2e.

## Iniciando o sistema

Requisitos:

Previamente deve-se instalar o ambiente de desenvolvimento [Node.Js](https://nodejs.org/pt) e o banco de dados [PostgreSQL](https://www.postgresql.org/).

No banco de dados criamos um banco de dados com o nome `smoke-track`.

### Passo a Passo

1. Clone este repositório em sua máquina local.

2. Na raiz do projeto, crie um arquivo `.env` com base no exemplo disponível em `.env.example`, adaptando os valores às configurações do seu ambiente.

3. No terimal, navegue até a raiz do projeto e execute:

```bash
 ts-node create-database.ts
```

Este comando criará o banco de dados com o nome `smoke-track`.

4. No terminal, navegue até a raiz do projeto e execute:

```bash
  npm install
```

Isso instalará todas as dependências do projeto.

5. Após a instalação, inicie a aplicação em modo de desenvolvimento com:

```bash
  npm run start:dev
```

6. Com o servidor em execução, acesse a documentação das APIs no navegador pelo endereço:
   http://localhost:3000/swagger
