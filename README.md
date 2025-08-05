# Finance Code

Este projeto é um sistema de gerenciamento financeiro pessoal, desenvolvido com foco na aplicação prática de conceitos de qualidade e teste de software. O objetivo principal é demonstrar como a qualidade do software pode ser garantida através de ferramentas e práticas de teste, mesmo em um sistema de escopo moderado.

## Tecnologias Utilizadas

### Backend (Node.js)
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **PostgreSQL**: Banco de dados relacional.
- **ESLint**: Ferramenta de linting para garantir a qualidade do código.
- **Jest**: Framework de testes para JavaScript.
- **Supertest**: Biblioteca para testar APIs HTTP.

### Frontend (React)
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build para projetos frontend.
- **Cypress**: Framework para testes de ponta a ponta (E2E).

## Configuração do Ambiente

Para configurar e executar o projeto, siga os passos abaixo:

### 1. Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- [Node.js](https://nodejs.org/en/download/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (servidor de banco de dados)

### 2. Clonar o Repositório

```bash
git clone https://github.com/Kayonz/finance_code.git
cd finance_code
```

### 3. Configuração do Banco de Dados

Crie um banco de dados PostgreSQL para o projeto. Você pode usar o `psql` ou uma ferramenta gráfica como o `pgAdmin`.

```sql
CREATE DATABASE finance_code;
```

Crie um arquivo `.env` na raiz do diretório `backend` com as seguintes variáveis de ambiente:

```
DB_USER=seu_usuario_postgres
DB_HOST=localhost
DB_DATABASE=finance_code
DB_PASSWORD=sua_senha_postgres
DB_PORT=5432
PORT=5000
JWT_SECRET=seu_segredo_jwt
```

### 4. Instalação das Dependências

#### Backend

Navegue até o diretório `backend` e instale as dependências:

```bash
cd backend
npm install
```

#### Frontend

Navegue até o diretório `frontend-web` e instale as dependências:

```bash
cd ../frontend-web
npm install
```

## Execução do Projeto

### 1. Iniciar o Backend

No diretório `backend`, execute:

```bash
npm start
```

O backend estará rodando em `http://localhost:5000`.

### 2. Iniciar o Frontend

No diretório `frontend-web`, execute:

```bash
npm start
```

O frontend estará disponível em `http://localhost:3000`.

## Testes

### Executar Testes do Backend (Unidade e Integração)

No diretório `backend`, execute:

```bash
npm test
```

Isso executará os testes de unidade e integração configurados com Jest e Supertest.

### Executar Testes de Ponta a Ponta (E2E) com Cypress

Certifique-se de que o backend e o frontend estejam rodando (conforme as instruções acima).

No diretório `frontend-web`, execute:

```bash
npm run cypress:open
```

Isso abrirá a interface do Cypress, onde você poderá selecionar e executar os testes E2E. Para executar os testes em modo headless (sem interface gráfica), use:

```bash
npm run cypress:run
```

## Conceitos de Qualidade e Teste Aplicados

Este projeto demonstra a aplicação dos seguintes conceitos de qualidade e teste de software:

### 1. Análise Estática de Código (Linting)

- **Ferramenta**: ESLint
- **Aplicação**: O ESLint foi configurado no diretório `backend` para analisar o código JavaScript, identificando e reportando padrões problemáticos. Isso ajuda a manter um estilo de código consistente e a prevenir erros comuns antes mesmo da execução. A configuração foi adaptada de um projeto de referência (`qtsw-blog`) para se adequar ao ambiente Node.js e JavaScript puro do backend.

### 2. Testes Automatizados

- **Ferramentas**: Jest (framework de testes), Supertest (para testes de integração de API), Cypress (para testes E2E).
- **Aplicação**: Foram implementados testes automatizados para o backend e frontend, cobrindo:
  - **Testes de Unidade**: Verificação de funções e módulos isolados (ex: validações, utilitários).
  - **Testes de Integração**: Verificação da interação entre diferentes componentes, como rotas da API e o banco de dados. Um exemplo de teste de integração para a rota `/` e `/usuarios` foi adicionado, demonstrando a capacidade de testar endpoints da API e simular cenários de erro (como a falha de conexão com o banco de dados).
  - **Testes de Ponta a Ponta (E2E)**: Utilizando Cypress, foram criados testes que simulam a interação do usuário com a interface do frontend, verificando fluxos completos da aplicação (ex: navegação, preenchimento de formulários). Isso garante que o sistema funcione corretamente como um todo, desde a interface do usuário até o backend e o banco de dados.

### Próximos Passos (Melhorias Contínuas)

Para aprimorar ainda mais a qualidade e testabilidade do projeto, as seguintes áreas podem ser exploradas:

- **Cobertura de Testes**: Aumentar a cobertura de testes para todas as funcionalidades críticas do sistema.
- **Testes de Performance**: Avaliar o desempenho da API sob carga.
- **Testes de Segurança**: Identificar e mitigar vulnerabilidades de segurança.
- **Integração Contínua/Entrega Contínua (CI/CD)**: Automatizar o processo de build, teste e deploy do projeto.
- **Revisões de Código**: Implementar um processo formal de revisão de código entre os membros da equipe.


