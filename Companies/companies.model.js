const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companiesSchema = new Schema({
  name: { type: String },
  address: { type: String },
  email: { type: String, require: true },
  phone: { type: Number },
  cityId: { type: Schema.ObjectId, ref: "city", required: true },
});

module.exports = mongoose.model("companies", companiesSchema);
