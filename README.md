# API CRUD de Usuários

## Descrição

Esta é uma API CRUD (Create, Read, Update, Delete) para gerenciamento de usuários. O projeto foi desenvolvido em Node.js com TypeScript e Express, utilizando MongoDB como banco de dados. A API segue as melhores práticas de organização de código, como a separação de responsabilidades em controladores, serviços e repositórios.

## Funcionalidades

- Criar um novo usuário
- Listar todos os usuários
- Obter um usuário por ID
- Atualizar um usuário
- Deletar um usuário
- Autenticação de usuário com JWT

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução do JavaScript no servidor.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Express:** Framework para construção de APIs web.
- **MongoDB:** Banco de dados NoSQL orientado a documentos.
- **Mongoose:** Biblioteca para modelagem de objetos MongoDB.
- **Zod:** Biblioteca para validação de esquemas de dados.
- **JWT (JSON Web Token):** Padrão para criação de tokens de acesso.
- **Swagger:** Ferramenta para documentação e teste de APIs.
- **tsx:** Ferramenta para desenvolvimento em TypeScript com reinicialização automática.
- **dotenv:** Biblioteca para carregar variáveis de ambiente de um arquivo `.env`.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/api-crud-de-usuarios.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd api-crud-de-usuarios
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
   ```
   MONGO_URI=<sua_string_de_conexao_mongodb>
   PORT=3000
   JWT_SECRET=<seu_segredo_jwt>
   ```

## Uso

Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

### Scripts Disponíveis

- `npm start`: Inicia o servidor em modo de desenvolvimento com `tsx`.

## Endpoints da API

A documentação completa da API está disponível via Swagger em `http://localhost:3000/api-docs`.

### Autenticação

A maioria das rotas requer um token de autenticação JWT. O token deve ser enviado no header `Authorization` no formato `Bearer <token>`.

### Usuários

- **POST /users:** Cria um novo usuário.
- **GET /users:** Retorna uma lista de todos os usuários.
- **GET /users/:id:** Retorna um usuário específico com base no ID.
- **PUT /users/:id:** Atualiza um usuário existente.
- **DELETE /users/:id:** Deleta um usuário.

## Estrutura do Projeto

```
src/
├───controllers/
│   └───UserController.ts   # Controladores para gerenciar as requisições
├───docs/
│   └───swagger.json        # Arquivo de configuração do Swagger
├───erros/
│   └───HttpError.ts        # Classe de erro customizada
├───middleware/
│   ├───authMiddleware.ts   # Middleware de autenticação
│   └───errorHandlerMiddleware.ts # Middleware para tratamento de erros
├───models/
│   ├───IUser.ts            # Interface para o modelo de usuário
│   └───User.ts             # Modelo de usuário do Mongoose
├───repositories/
│   └───UserRepository.ts   # Camada de acesso aos dados do MongoDB
├───routes/
│   └───UserRoutes.ts       # Definição das rotas da API
├───schemas/
│   └───userSchema.ts       # Esquemas de validação com Zod
├───services/
│   └───UserService.ts      # Lógica de negócio
└───server.ts               # Arquivo principal da aplicação
```

## Tratamento de Erros

A API utiliza um middleware de tratamento de erros para capturar e retornar erros de forma padronizada. Os erros são retornados com um status code e uma mensagem de erro.

<br/><br/>

<img width="1450" height="833" alt="image" src="https://github.com/user-attachments/assets/91d79a4f-959c-4813-b0fa-71756457a157" />

