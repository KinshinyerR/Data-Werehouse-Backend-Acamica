const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: { type: String, require: true },
  countryId: { type: Schema.ObjectId, ref: "country", required: true },
});

module.exports = mongoose.model("city", citySchema);
