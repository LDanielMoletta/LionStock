````markdown
# 🦁 LionStock

Sistema de gerenciamento de estoque desenvolvido como projeto final do curso de Desenvolvimento Full Stack.

O **LionStock** permite o gerenciamento completo de produtos, categorias, fornecedores, movimentações de estoque e usuários, utilizando autenticação via **JWT** e controle de permissões baseado em perfis de acesso.

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
- JWT (JSON Web Token)
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

### Perfis de acesso

| Perfil | Permissões |
|---------|------------|
| 👑 Administrador | Acesso total ao sistema |
| 🛠️ Operador | Gerencia produtos e movimentações |
| 👁️ Visualizador | Apenas consulta informações |

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
````
