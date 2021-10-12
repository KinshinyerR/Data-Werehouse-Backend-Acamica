# Data-Werehouse-Backend-Acamica

## Content
- [Data Werehouse API](#data-Werehouse-api)
  - [Content](#content)
  - [Modules](#modules)
  - [Installation](#installation)
    - [Node](#node)
    - [DataBase](#database)
    - [JWT](#jwt)
  - [API](#api)
    - [Using local node server](#using-local-node-server)
      - [You can run the api with command](#you-can-run-the-api-with-command)
## Modules
- Express
- mongoose
- morgan

## Installation
### Node
```bash
npm install
```
### DataBase
1. Add env vars to the `.env` file
```
MONGODB=mongodb://localhost/datawerehouse
```
### JWT
Add the secret word to `.env` file
```
JWT_SECRET=123456
```

## API
### Using local node server
#### You can run the api with command
```bash
npm run dev
```
Para crear un usuario de `perfil : admin` debes de hacer una petición a http://localhost:4000/users/register/admin con los siguientes parametros (Postman):
```bash
{
    "nombre": "user",
    "apellido": "user",
    "email": "admin@example.com",
    "perfil": "admin", 
    "password": "admin123"
}
```
Ahora ya puedes usar este usuario en la app del front-end https://github.com/KinshinyerR/Data-Werehouse-Frontend-Acamica.
