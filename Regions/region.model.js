const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regionSchema = new Schema({
  name: { type: String, required: true },
  countries: [{ type: Schema.ObjectId, ref: "country" }],
});

module.exports = mongoose.model("region", regionSchema);
