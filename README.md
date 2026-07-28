# 🦁 LionStock

Sistema de gerenciamento de estoque desenvolvido como projeto final do curso de Desenvolvimento Full Stack.

O LionStock permite o controle de produtos, categorias, fornecedores, movimentações de estoque e usuários, utilizando autenticação por JWT e controle de permissões por perfil.

---

# Demonstração

## Frontend

https://lionstock-frontend.onrender.com/

## Backend

https://lionstock.onrender.com/

---

#  Tecnologias Utilizadas

## Frontend

- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- Lucide React

## Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt
- Dotenv

## Deploy

- Render
- MongoDB Atlas

---

# Funcionalidades

## Autenticação

- Login com JWT
- Logout
- Rotas protegidas
- Controle por perfil

---

## Usuários

- Cadastro
- Edição
- Exclusão
- Consulta

Perfis:

- Administrador
- Operador
- Visualizador

---

## Produtos

- Cadastro
- Consulta
- Atualização
- Exclusão

---

## Categorias

- Cadastro
- Consulta
- Atualização
- Exclusão

---

## Fornecedores

- Cadastro
- Consulta
- Atualização
- Exclusão

---

## Movimentações

- Entrada de estoque

- Saída de estoque

- Histórico de movimentações

---

# Estrutura do Projeto

```
LionStock
│
├── backend
│   ├── src
│   ├── routes
│   ├── controllers
│   ├── services
│   ├── models
│   ├── middlewares
│   └── utils
│
└── frontend
    ├── src
    ├── pages
    ├── components
    ├── services
    ├── contexts
    └── routes
```

---

# Instalação

## Backend

```bash
git clone https://github.com/LDanielMoletta/LionStock.git

cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Variáveis de Ambiente

Backend (.env)

```env
PORT=3000

MONGODB_URI=...

JWT_SECRET=...

JWT_EXPIRES_IN=24h

ADMIN_EMAIL=admin@lionstock.com

ADMIN_PASSWORD=********
```

Frontend (.env)

```env
VITE_API_URL=https://lionstock.onrender.com
```

---

# API

## Login

POST

```
/api/auth/login
```

## Produtos

GET

POST

PUT

DELETE

```
/api/products
```

## Categorias

```
/api/categories
```

## Fornecedores

```
/api/suppliers
```

## Usuários

```
/api/users
```

## Movimentações

```
/api/movements
```

---

# Segurança

O sistema utiliza:

- JWT para autenticação
- Senhas criptografadas com Bcrypt
- Middleware de autenticação
- Middleware de autorização por perfil

---

# Equipe

### Luiz Daniel Moletta Junior

- Frontend
- Integração Frontend/Backend
- Deploy
- Documentação

---

### Luiz Henrique

- Autenticação
- Usuários
- JWT

---

### Julio Cesar

- Produtos
- Categorias
- Fornecedores
- Movimentações

---

# Licença

Projeto acadêmico desenvolvido exclusivamente para fins educacionais.
