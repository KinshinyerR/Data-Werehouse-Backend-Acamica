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
MONGODB=mongodb+srv://dbadmin:Q1w2e3r4t5@cluster0.gl2kw.mongodb.net/DataWerehouse?retryWrites=true&w=majority
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
To use an admin example, you can sign in with the admin `perfil`:
```bash
  {
    "nombre": "user",
    "apellido": "user",
    "email": "user@example.com",
    "perfil": "admin", 
    "password": "user123"
}
```
To access to restricted endpoint, use the `login` endpoint first, copy the JWT and click on Authorize option.
