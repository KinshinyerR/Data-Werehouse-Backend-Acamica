const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  position: { type: String },
  email: { type: String, require: true },
  company: {
    name: { type: String },
    address: { type: String },
    email: { type: String },
    phone: { type: Number },
    city: { type: String },
    country: { type: String },
    region: { type: String },
  },
  region: { type: String },
  country: { type: String },
  city: { type: String },
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
