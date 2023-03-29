<h1 align="center"> Projeto LabEddit </h1>

# Índice 

* [Introdução](#introdução)
* [Conteúdos abordados no projeto](#conteúdos-abordados-no-projeto)
* [Endpoints](#endpoints)
* [Dependências](#dependências)
* [Rodando o projeto](#rodando-o-projeto)
* [Link da Documentação](#link-da-documentação)

# Introdução 
O projeto LabEddit é uma rede social onde tem como objetivo a conexão e a interação entre pessoas. Quem se cadastrar no aplicativo poderá criar, curtir e comentar publicações.

# Conteúdos abordados no projeto

- NodeJS
- Typescript
- Express
- SQLite
- Knex
- Arquitetura em camadas
- Programação Orientada a Objetos
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman
- Deploy com o Render

# Endpoints

- [x]  Login User
- [x]  Create User
- [x]  Get Posts
- [x]  Get Post By Id
- [x]  Insert New Post
- [x]  Update Post
- [x]  Delete Post
- [x]  Like Dislike Post
- [x]  Create Comment
- [x]  Get Comments
- [x]  Edit Comment
- [x]  Delete Comment
- [x]  Like Dislike Comment


### :dart: LOGIN USER - Login de usuário já cadastrado. Endpoint público utilizado para fazer login. Devolve um token jwt.

```
// request POST /users/login
// body JSON
{
  "email": "julio@email.com",
  "password": "julio123"
}

// response
// status 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
}
```

### :dart: CREATE USER - Criação de usuário. Endpoint público para fazer um cadastro. Devolve um token jwt.

```
// request POST /users/signup
// body JSON
{
  "name": "Júlia",
  "email": "julia@email.com",
  "password": "julia123"
}
// response
// status 201 CREATED

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
}
```

### :dart: GET POSTS - Esse endpoint é protegido, precisa de um token jwt para acessá-lo.
```
// request GET /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"

// response
// status 200 OK
[
  {
    "id": "7865bff0-5df9-4c81-b705-f810732112bb",
    "content": "Melhor jogador de todos os tempos?",
    "comments": 1,
    "likes": 0,
    "dislikes": 0,
    "createdAt": "2023-03-28T12:32:30.019Z",
    "updatedAt": "2023-03-28T12:32:30.019Z",
    "creator": {
      "id": "09f070b4-0b51-408b-8048-d7f659842bc6",
      "name": "Ademir"
    }
  },
  {
    "id": "a93cd6b7-598a-490e-a7ea-deffbeff22f8",
    "content": "Tempo Hoje?",
    "comments": 1,
    "likes": 1,
    "dislikes": 0,
    "createdAt": "2023-03-28T20:03:04.269Z",
    "updatedAt": "2023-03-28T20:03:04.269Z",
    "creator": {
      "id": "0cb56700-dc0a-457a-81b5-6d9e00dd3436",
      "name": "Júlio"
    }
  }
]
```

### :dart: GET POST BY ID - Busca o post pelo id. Esse endpoint é protegido, precisa de um token jwt para acessá-lo.
```
// request GET /posts/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"

// response
// status 200 OK
[
  {
    "id": "a93cd6b7-598a-490e-a7ea-deffbeff22f8",
    "content": "Tempo Hoje?",
    "likes": 1,
    "dislikes": 0,
    "comments": 1,
    "createdAt": "2023-03-28T20:03:04.269Z",
    "updatedAt": "2023-03-28T20:03:04.269Z",
    "creator": {
      "id": "0cb56700-dc0a-457a-81b5-6d9e00dd3436",
      "name": "Júlio"
    },
    "comment": [
      {
        "id": "daff5a02-27ae-4c9c-a533-9688fb03e8e2",
        "postId": "a93cd6b7-598a-490e-a7ea-deffbeff22f8",
        "content": "Nublado",
        "likes": 1,
        "dislikes": 0,
        "createdAt": "2023-03-28T20:05:56.808Z",
        "updatedAt": "2023-03-28T20:05:56.808Z",
        "creator": {
          "id": "0cb56700-dc0a-457a-81b5-6d9e00dd3436",
          "name": "Júlio"
        }
      }
    ]
  }
]
```

### :dart: INSERT NEW POST - Cria um novo post. Endpoint protegido, precisa de um token jwt para poder acessá-lo.

```
// request POST /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
// body JSON
{
  "content": "Melhor música?"
}

// response
// status 201 CREATED
{
  "message": "Post criado com sucesso",
  "post": {
    "id": "70cafd5f-32e1-446a-971e-09a69efa6b16",
    "content": "Melhor música?",
    "likes": 0,
    "dislikes": 0,
    "comments": 0,
    "createdAt": "2023-03-28T20:24:20.532Z",
    "updatedAt": "2023-03-28T20:24:20.532Z",
    "creatorId": "0cb56700-dc0a-457a-81b5-6d9e00dd3436",
    "creatorName": "Júlio"
  }
}
```

### :dart: UPDATE POST - Edita um post já criado. Somente ADMIN e quem criou o post pode editar. Endpoint protegido, precisa de um token jwt para poder acessá-lo.

```
// request PUT /posts/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
// body JSON
{
   "content": "Uma música boa?"
}

// response
// status 201 CREATED
{
  "message": "Post editado com sucesso",
  "content": "Uma música boa?"
}
```

### :dart: DELETE POST - Deleta um post já criado. Somente ADMIN e quem criou o post pode deletar. Endpoint protegido, precisa de um token jwt para poder acessá-lo.

```
// request DELETE /posts/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"

// response
// status 200 OK
{
  "message": "Post excluído com sucesso"
}
```

### :dart: LIKE DISLIKE POST - Adiciona like ou dislike em um post. Se utiliza o número 1 para like e o número 0 para dislike. Endpoint protegido, requer um token jwt para poder acessá-lo. 

Caso dê um like em um post que já tenha dado like, o like é desfeito.
Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.

Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.
Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.

Primeira funcionalidade - Like
```
// request PUT /posts/:id/like
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
// body JSON
{
   "like": 1
}

// response
// status 200 OK
{
  "message": "Você interagiu no post"
}
```

Segunda funcionalidade - Dislike
```
// request PUT /posts/:id/like
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
// body JSON
{
   "like": 0
}

// response
// status 200 OK
{
  "message": "Você interagiu no post"
}
```

### :dart: CREATE COMMENT - Criação de um comentário para um post. Endpoint protegido, precisa de um token jwt para poder acessá-lo.

```
// request POST /comments/:id/post
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
// body JSON
{
   "content": "Nublado"
}

// response
// status 201 CREATED
{
  "message": "Comentário criado com sucesso",
  "comment": {
    "id": "daff5a02-27ae-4c9c-a533-9688fb03e8e2",
    "postId": "a93cd6b7-598a-490e-a7ea-deffbeff22f8",
    "content": "Nublado",
    "likes": 0,
    "dislikes": 0,
    "createdAt": "2023-03-28T20:05:56.808Z",
    "updatedAt": "2023-03-28T20:05:56.808Z",
    "creatorId": "0cb56700-dc0a-457a-81b5-6d9e00dd3436",
    "creatorName": "Júlio"
  }
}
```

### :dart: EDIT COMMENT - Edita um comentário já criado. Somente quem criou o comentário pode editar. Endpoint protegido, precisa de um token jwt para poder acessá-lo.

```
// request PUT /comments/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
// body JSON
{
  "content": "Chuvoso"
}

// response
// status 201 CREATED
{
  "message": "Comentário editado com sucesso",
  "content": "Chuvoso"
}
```

### :dart: DELETE COMMENT - Deleta um comentário já criado. Somente ADMIN e quem criou o comentário pode deletar. Endpoint protegido, precisa de um token jwt para poder acessá-lo.

```
// request DELETE /comments/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"

// response
// status 200 OK
{
  "message": "Comentário excluído com sucesso"
}
```

### :dart: LIKE DISLIKE COMMENT - Adiciona like ou dislike em um comentário. Se utiliza o número 1 para like e o número 0 para dislike. Endpoint protegido, requer um token jwt para poder acessá-lo. 

Primeira funcionalidade - Like
```
// request PUT /comments/:id/like
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
// body JSON
{
    "like": 1
}

// response
// status 200 OK
{
  "message": "Você interagiu no post"
}
```

Segunda funcionalidade - Dislike
```
// request PUT /comments/:id/like
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYjU2NzAwLWRjMGEtNDU3YS04MWI1LTZ"
// body JSON
{
    "like": 0
}

// response
// status 200 OK
{
  "message": "Você interagiu no post"
}
```

# Dependências

### :large_blue_circle: SCRIPTS
```
"scripts": {
    "dev": "ts-node-dev src/index.ts",
    "start": "node ./build/index.js",
		"build": "tsc",
		"test": "jest"
}
```

### :large_blue_circle: Dependencies
```
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "knex": "^2.4.2",
    "sqlite3": "^5.1.4",
    "uuid": "^9.0.0"
  }
```

### :large_blue_circle: devDependencies 
```
"devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.0",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/knex": "^0.16.1",
    "@types/node": "^18.14.5",
    "@types/uuid": "^9.0.1",
    "jest": "^29.5.0",
    "ts-jest": "^29.0.5",
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.9.5"
}
```

# Rodando o projeto 

Você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), o [Node.js](https://nodejs.org/en/), o [Postman](https://www.postman.com) e um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)
```
# Clone este repositório
$ git clone (https://github.com/Heytordesouza/Labeddit-Backend.git)

# Acesse a pasta do projeto no terminal
$ cd projeto-labeddit-back

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta:3003> 
```

# Link da Documentação

https://documenter.getpostman.com/view/24460695/2s93RRvsbu
