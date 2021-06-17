const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regionsSchema = new Schema({
  regionName: { type: String, required: true },
  countryList: [
    {
      countryName: { type: String },
      cityList: [
        {
          cityName: { type: String },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("regions", regionsSchema);
