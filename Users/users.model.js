const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  perfil: {
    type: String,
    enum: ["basic", "admin"],
    default: "basic",
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("users", usersSchema);
