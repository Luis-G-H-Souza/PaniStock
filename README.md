# Panistock – Sistema de Controle Logístico de Carregamento de Caminhões

## 📦 Descrição

**Panistock** é uma API desenvolvida com Node.js e NestJS que tem como objetivo otimizar o processo logístico de **carregamento de caminhões**. O sistema permite:

- Cadastrar **pedidos** e **clientes**;
- Registrar **caminhões** que realizarão as entregas;
- Criar e gerenciar **romaneios**, que organizam quais caminhões entregarão quais pedidos;
- Registrar os **eventos operacionais do carregamento** (chegada, início, fim, saída), otimizando o tempo e controle do pátio.

O projeto é voltado para empresas que lidam com expedição e transporte de cargas e busca fornecer controle, rastreabilidade e eficiência em tempo real ou planejado.

---

## 🚀 Funcionalidades

- ✅ Cadastro de clientes e pedidos
- ✅ Cadastro de caminhões
- ✅ Registro de eventos logísticos:
  - Chegada do caminhão
  - Início do carregamento
  - Término do carregamento
  - Saída do caminhão
- ✅ Criação de romaneios com associação entre caminhões e pedidos
- 🔄 (Em desenvolvimento) Geração automática de romaneios com base nos CEPs dos clientes
- 🔐 Autenticação de usuários e controle de acesso

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **NestJS** – Framework backend modular e escalável
- **PostgreSQL** – Banco de dados relacional
- **TypeORM** – Mapeamento objeto-relacional
- **Swagger** – Documentação e testes interativos de API
- **Supertest** – Testes de integração (E2E)
- **ESLint** – Padronização de código

---

## 🖥️ Iniciando o Projeto Localmente

### Requisitos

- [Node.js](https://nodejs.org/pt)
- [PostgreSQL](https://www.postgresql.org/)

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/Luis-G-H-Souza/panistock.git
cd panistock
```

2. Na raiz do projeto, crie um arquivo `.env` com base no exemplo disponível em `.env.example`, adaptando os valores às configurações do seu ambiente.

3. No terimal, navegue até a raiz do projeto e execute:

```bash
 ts-node create-database.ts
```

Este comando criará o banco de dados com o nome `panistock`.

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

### 📚 Observações

Este projeto está em desenvolvimento e ainda não implementa todas as funcionalidades previstas para o MVP completo.

Está sendo utilizado como estudo prático e também como primeiro projeto de portfólio para fins profissionais.

### 📌 Autor

Desenvolvido por Luis-G-H-Souza – Estudante autodidata em desenvolvimento back-end, com experiência prática adquirida por meio de estágio e projetos pessoais.
Este projeto foi iniciado com o objetivo de atender necessidades reais da empresa onde trabalho, e também como passo inicial para atuar de forma profissional na área de desenvolvimento.
