````markdown
# 🦁 LionStock

Sistema de gerenciamento de estoque desenvolvido como projeto final do curso de Desenvolvimento Full Stack.

O **LionStock** permite o gerenciamento de produtos, categorias, fornecedores, movimentações de estoque e usuários, utilizando autenticação via **JWT** e controle de permissões baseado em perfis de acesso.

---

# 🚀 Demonstração

| Aplicação | Link |
|-----------|------|
| 🌐 Frontend | https://lionstock-frontend.onrender.com/ |
| ⚙️ Backend API | https://lionstock.onrender.com/ |

---

# 🛠️ Tecnologias Utilizadas

## 🎨 Frontend

- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- Lucide React

## ⚙️ Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt
- Dotenv

## ☁️ Deploy

- Render
- MongoDB Atlas

---

# ✨ Funcionalidades

## 🔐 Autenticação

- Login com JWT
- Logout
- Rotas protegidas
- Controle de acesso por perfil

## 👥 Usuários

### Funcionalidades

- Cadastro
- Consulta
- Atualização
- Exclusão

### Perfis de Acesso

| Perfil | Permissões |
|---------|------------|
| 👑 Administrador | Controle total do sistema |
| 🛠️ Operador | Gerenciamento de estoque |
| 👁️ Visualizador | Apenas consultas |

## 📦 Produtos

- Cadastro
- Consulta
- Atualização
- Exclusão

## 🏷️ Categorias

- Cadastro
- Consulta
- Atualização
- Exclusão

## 🚚 Fornecedores

- Cadastro
- Consulta
- Atualização
- Exclusão

## 📊 Movimentações

- Entrada de estoque
- Saída de estoque
- Histórico de movimentações

---

# 📁 Estrutura do Projeto

```text
LionStock/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    ├── public/
    ├── vite.config.js
    └── package.json
```

---

# ⚙️ Instalação

## 1. Clone o repositório

```bash
git clone https://github.com/LDanielMoletta/LionStock.git
```

## 2. Acesse a pasta

```bash
cd LionStock
```

## 3. Instale as dependências

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

## 4. Execute o projeto

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na pasta **backend**.

```env
PORT=3000

MONGODB_URI=sua_string_do_mongodb

JWT_SECRET=sua_chave_jwt

SALT_ROUNDS=10
```

---

# 📡 Rotas da API

## Autenticação

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| POST | `/api/auth/login` | Realiza login e retorna o token JWT |

## Usuários

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/api/users` | Lista usuários |
| GET | `/api/users/:id` | Busca usuário por ID |
| POST | `/api/users` | Cria usuário |
| PUT | `/api/users/:id` | Atualiza usuário |
| DELETE | `/api/users/:id` | Remove usuário |

## Produtos

| Método | Endpoint |
|---------|----------|
| GET | `/api/products` |
| POST | `/api/products` |
| PUT | `/api/products/:id` |
| DELETE | `/api/products/:id` |

## Categorias

| Método | Endpoint |
|---------|----------|
| GET | `/api/categories` |
| POST | `/api/categories` |
| PUT | `/api/categories/:id` |
| DELETE | `/api/categories/:id` |

## Fornecedores

| Método | Endpoint |
|---------|----------|
| GET | `/api/suppliers` |
| POST | `/api/suppliers` |
| PUT | `/api/suppliers/:id` |
| DELETE | `/api/suppliers/:id` |

## Movimentações

| Método | Endpoint |
|---------|----------|
| GET | `/api/movements` |
| POST | `/api/movements` |

---

# 👨‍💻 Equipe

| Integrante | Responsabilidade |
|------------|------------------|
| **Luiz Daniel Moletta Junior** | Frontend, integração, deploy e documentação |
| **Luiz Henrique** | Autenticação e gerenciamento de usuários |
| **Julio Cesar** | Produtos, categorias, fornecedores e movimentações |

---

# 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como projeto final do curso de Desenvolvimento Full Stack.

Todos os direitos pertencem aos respectivos autores.
````
