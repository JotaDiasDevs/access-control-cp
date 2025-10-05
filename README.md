# Sistema de Controle de Acesso

Este é um sistema de autenticação desenvolvido com React, TypeScript, React Hook Form e json-server.

## Integrantes do Grupo

- **Nome**: João Victor Semente Dias - **RM**: 562065
- **Nome**: Rodrigo Tiezzi - **RM**: 562975
- **Nome**: Christian de Souza Freitas - **RM**: 566098

## Descrição do Projeto

O Sistema de Controle de Acesso é uma aplicação web que permite o cadastro e autenticação de usuários. A aplicação foi desenvolvida utilizando as seguintes tecnologias:

- **React 19** com **TypeScript**
- **Vite** como bundler
- **React Hook Form** para validação de formulários
- **React Router DOM** para roteamento
- **Tailwind CSS** para estilização
- **json-server** como backend simulado
- **localStorage** para persistência de sessão

## Funcionalidades Implementadas

### 1. Autenticação de Usuários
- Sistema de login com validação de credenciais
- Cadastro de novos usuários com verificação de duplicidade
- Persistência de sessão usando localStorage
- Proteção de rotas autenticadas

### 2. Formulários com Validação
- Formulário de login com campos: nomeUsuario e email
- Formulário de cadastro com campos: nome, nomeUsuario e email
- Validação em tempo real com mensagens de erro personalizadas
- Validação de formato de email e regras de negócio

### 3. Interface do Usuário
- Design responsivo com Tailwind CSS
- Exibição das informações do usuário autenticado
- Navegação intuitiva entre páginas
- Feedback visual para ações do usuário

### 4. Backend Simulado
- API REST com json-server
- Endpoint `/usuarios` para CRUD de usuários
- Verificação de duplicidade de dados
- Persistência de dados em arquivo JSON

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx       # Layout principal com header
│   └── ProtectedRoute.tsx # Componente para rotas protegidas
├── contexts/            # Contextos React
│   └── AuthContext.tsx  # Contexto de autenticação
├── pages/               # Páginas da aplicação
│   ├── Login.tsx        # Página de login
│   ├── Cadastro.tsx     # Página de cadastro
│   └── Dashboard.tsx    # Página principal após login
├── services/            # Serviços de API
│   └── apiService.ts    # Serviços para comunicação com backend
├── types/               # Definições de tipos TypeScript
│   └── index.ts         # Interfaces e tipos
├── App.tsx              # Componente principal
└── main.tsx             # Ponto de entrada da aplicação
```

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd access-control-cp
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o json-server (em um terminal separado)**
   ```bash
   npm run json-server
   ```

4. **Execute a aplicação React (em outro terminal)**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001

## Rotas da Aplicação

- `/` - Redireciona para `/login`
- `/login` - Página de login (página inicial)
- `/cadastro` - Página de cadastro de novos usuários
- `/dashboard` - Página principal após autenticação (protegida)

## Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter
- `npm run json-server` - Executa o servidor JSON

## Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Vite
- **Roteamento**: React Router DOM
- **Formulários**: React Hook Form
- **Estilização**: Tailwind CSS
- **Backend**: json-server
- **Persistência**: localStorage
- **Validação**: React Hook Form com validação customizada

## Funcionalidades de Segurança

- Validação de formulários no frontend e backend
- Verificação de duplicidade de dados
- Proteção de rotas autenticadas
- Persistência segura de sessão
- Validação de formato de email
- Sanitização de dados de entrada

## Contribuição

Este projeto foi desenvolvido como parte de um CheckPoint acadêmico. Para contribuições ou melhorias, entre em contato com os integrantes do grupo.

## Licença

Este projeto é destinado exclusivamente para fins educacionais.
