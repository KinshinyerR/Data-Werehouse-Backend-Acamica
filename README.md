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
    - [Swagger](#swagger)
## Modules
- Express
- swagger-ui-express
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
MONGODB=mongodb://127.0.0.1:27017/DelilahResto
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
### Swagger
```bash
http://localhost:3000/api-docs/ 
```
To use an admin example, you can sign in with the admin `role`:
```bash
  "user": "username",
  "name": "FirstName SecondName",
  "surname": "LastName",
  "email": "example@example.com",
  "password": "password",
  "phone": 123456789,
  "address": "Medellin",
  "role": "admin"
```
To access to restricted endpoint, use the `login` endpoint first, copy the JWT and click on Authorize option.
