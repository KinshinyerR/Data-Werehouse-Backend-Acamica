require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const usersController = require("./Users/users.controller");
const regionsController = require("./Regions/regions.controller");
const companiesController = require("./Companies/companies.controller");
const contactController = require("./Contacts/contacts.controller");

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", usersController);
app.use("/regions", regionsController);
app.use("/companies", companiesController);
app.use("/contacts", contactController);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Base de datos conectada");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor iniciado en el puerto ${port}`);
    });
  })
  .catch((error) => console.error(error));
