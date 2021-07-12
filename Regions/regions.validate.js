const { body } = require("express-validator");

const regionValidate = {
  addRegion: [
    body("name").exists().isString().trim().withMessage("Region invalida"),
  ],
  addCountry: [
    body("name").exists().isString().trim().withMessage("País invalida"),
  ],
  addCity: [
    body("name").exists().isString().trim().withMessage("Ciudad invalida"),
  ],
  updateRegion: [
    body("name").exists().isString().trim().withMessage("Region invalido"),
  ],
  updateCountry: [
    body("name").exists().isString().trim().withMessage("País invalido"),
  ],
  updateCity: [
    body("name").exists().isString().trim().withMessage("Ciudad invalida"),
  ],
};

module.exports = regionValidate;
