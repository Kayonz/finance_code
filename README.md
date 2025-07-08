# Finance Code

## Visão Geral

O Finance Code é um projeto desenvolvido para auxiliar no controle financeiro pessoal, permitindo que os usuários gerenciem suas receitas e despesas de forma eficiente. A aplicação é dividida em duas partes principais: um backend robusto para manipulação de dados e um frontend web intuitivo para interação do usuário.

## Estrutura do Projeto

O projeto é composto por dois diretórios principais:

- `backend/`: Contém a lógica de servidor, API e integração com o banco de dados.
- `frontend-web/`: Contém a interface do usuário desenvolvida em React.




### Backend

O backend do Finance Code é construído com as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript assíncrono e orientado a eventos.
- **Express.js**: Framework web para Node.js, utilizado para construir a API RESTful.
- **bcrypt**: Biblioteca para hash de senhas, garantindo a segurança das credenciais dos usuários.
- **cors**: Middleware para habilitar o Cross-Origin Resource Sharing (CORS), permitindo requisições do frontend.
- **dotenv**: Módulo para carregar variáveis de ambiente de um arquivo `.env`.
- **jsonwebtoken**: Implementação de JSON Web Tokens (JWT) para autenticação e autorização.
- **PostgreSQL**

#### Como Iniciar o Backend

Para configurar e executar o backend, siga os passos abaixo:

1.  Navegue até o diretório `backend`:
    ```bash
    cd backend
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env` na raiz do diretório `backend` e configure as variáveis de ambiente necessárias (`JWT_SECRET`).
4.  Inicie o servidor:
    ```bash
    npm start
    ```
    O servidor estará disponível em `http://localhost:3000` (ou na porta configurada).




### Frontend Web

O frontend web do Finance Code é uma aplicação React desenvolvida para proporcionar uma experiência de usuário fluida e interativa. As principais tecnologias e bibliotecas utilizadas incluem:

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **@emotion/react** e **@emotion/styled**: Bibliotecas para estilização de componentes React com CSS-in-JS.
- **@mui/material**: Componentes de UI do Material-UI para um design moderno e responsivo.
- **@testing-library/jest-dom**, **@testing-library/react**, **@testing-library/user-event**: Ferramentas para testes de componentes React.
- **axios**: Cliente HTTP baseado em Promises para fazer requisições a APIs.
- **npm**: Gerenciador de pacotes para Node.js.
- **react-google-charts**: Componentes React para integrar gráficos do Google Charts.
- **react-icons**: Biblioteca de ícones populares para React.
- **react-router-dom**: Biblioteca para roteamento declarativo no React.

#### Como Iniciar o Frontend

Para configurar e executar o frontend, siga os passos abaixo:

1.  Navegue até o diretório `frontend-web`:
    ```bash
    cd frontend-web
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Inicie a aplicação:
    ```bash
    npm start
    ```
    A aplicação será aberta automaticamente no seu navegador padrão em `http://localhost:3000`.




## Funcionalidades Principais

O Finance Code oferece as seguintes funcionalidades:

- **Cadastro e Autenticação de Usuários**: Sistema seguro de registro e login.
- **Dashboard Interativo**: Visão geral das finanças com gráficos e estatísticas.
- **Gerenciamento de Transações**: Adição, edição e exclusão de receitas e despesas.
- **Categorização**: Organização de transações por categorias personalizáveis.
- **Relatórios Financeiros**: Geração de relatórios detalhados por período.
- **Perfil de Usuário**: Personalização do perfil com foto e informações pessoais.

## Tecnologias Utilizadas

### Linguagens
- JavaScript (Node.js e React)

### Frontend
- React.js
- Material-UI
- React Router
- Axios
- React Google Charts

### Backend
- Node.js
- Express.js
- PostgreSQL
- JSON Web Token (JWT)
- Bcrypt

## Requisitos do Sistema

- Node.js (v14.0.0 ou superior)
- NPM (v6.0.0 ou superior)
- PostgreSQL (v10.0.0 ou superior)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
