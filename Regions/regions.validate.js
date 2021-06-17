const { body } = require("express-validator");

const regionValidate = {
  addRegion: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalida"),
    body("countryList.*.countryName")
      .optional()
      .isString()
      .trim()
      .withMessage("País invalido"),
    body("countryList.*.cityList.*.cityName")
      .optional()
      .isString()
      .trim()
      .withMessage("Ciudad invalida"),
  ],
  addCountry: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalida"),
    body("countryList.*.countryName")
      .exists()
      .isString()
      .trim()
      .withMessage("País invalido"),
    body("countryList.*.cityList.*.cityName")
      .optional()
      .isString()
      .trim()
      .withMessage("Ciudad invalida"),
  ],
  addCity: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalida"),
    body("countryList.*.countryName")
      .exists()
      .isString()
      .trim()
      .withMessage("País invalido"),
    body("countryList.*.cityList.*.cityName")
      .exists()
      .isString()
      .trim()
      .withMessage("Ciudad invalida"),
  ],
  updateRegion: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalido"),
    body("newRegionName")
      .exists()
      .isString()
      .trim()
      .withMessage("New Region name invalido"),
  ],
  updateCountry: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalido"),
    body("countryList.*.countryName")
      .exists()
      .isString()
      .trim()
      .withMessage("País invalido"),
    body("newCountryName")
      .exists()
      .isString()
      .trim()
      .withMessage("New Country name invalido"),
  ],
  updateCity: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalido"),
    body("countryList.*.countryName")
      .exists()
      .isString()
      .trim()
      .withMessage("País invalido"),
    body("countryList.*.cityList.*.cityName")
      .exists()
      .isString()
      .trim()
      .withMessage("Ciudad invalida"),
    body("newCityName")
      .exists()
      .isString()
      .trim()
      .withMessage("New City name invalido"),
  ],
  deleteRegion: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalido"),
  ],
  deleteCountry: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalido"),
    body("countryList.*.countryName")
      .exists()
      .isString()
      .trim()
      .withMessage("País invalido"),
  ],
  deleteCity: [
    body("regionName")
      .exists()
      .isString()
      .trim()
      .withMessage("Region invalido"),
    body("countryList.*.countryName")
      .exists()
      .isString()
      .trim()
      .withMessage("País invalido"),
    body("countryList.*.cityList.*.cityName")
      .exists()
      .isString()
      .trim()
      .withMessage("Ciudad invalida"),
  ],
};

module.exports = regionValidate;
