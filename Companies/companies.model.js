const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companiesSchema = new Schema({
  name: { type: String },
  address: { type: String },
  email: { type: String, require: true },
  phone: { type: Number },
  city: { type: String },
  country: { type: String },
  region: { type: String },
});

module.exports = mongoose.model("companies", companiesSchema);
