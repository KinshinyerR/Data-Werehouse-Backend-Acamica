const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: { type: String, require: true },
  regionId: { type: Schema.ObjectId, ref: "region", required: true },
  cities: [{ type: Schema.ObjectId, ref: "city" }],
});

module.exports = mongoose.model("country", countrySchema);
