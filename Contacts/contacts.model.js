const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  position: { type: String },
  email: { type: String, require: true },
  companyId: { type: Schema.ObjectId, ref: "companies", required: true },
  regionId: { type: Schema.ObjectId, ref: "regions", required: true },
  countryId: { type: Schema.ObjectId },
  cityId: { type: Schema.ObjectId },
  address: { type: String },
  interest: { type: Number },
  channels: [
    {
      channelName: { type: String },
      account: { type: String },
      preference: { type: String },
    },
  ],
});

module.exports = mongoose.model("contacts", contactsSchema);
