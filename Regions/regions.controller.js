const express = require("express");

const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const regionValidate = require("./regions.validate");
const regionService = require("./regions.service");

const router = express.Router();

/* GET ALL REGIONS/COUNTRIES/CITIES */
router.get("/all", auth, regionService.all);

/* GET ALL REGIONS */
router.get("/allRegions", auth, regionService.allRegions);

/* GET ALL COUNTRIES */
router.get("/allCountries", auth, regionService.allCountries);

/* GET ALL CITIES */
router.get("/allCities", auth, regionService.allCities);

/* REGISTER A REGION */
router.post(
  "/addRegion",
  auth,
  validate(regionValidate.addRegion),
  regionService.addRegion
);

/* REGISTER A CONTRY IN THE REGION */
router.post(
  "/addCountry",
  auth,
  validate(regionValidate.addCountry),
  regionService.addCountry
);

/* REGISTER A CITY IN THE COUNTRY */
router.post(
  "/addCity",
  auth,
  validate(regionValidate.addCity),
  regionService.addCity
);

/* Update A REGION */
router.put(
  "/updateRegion",
  auth,
  validate(regionValidate.updateRegion),
  regionService.updateRegion
);

/* UPDATE A CONTRY IN THE REGION */
router.put(
  "/updateCountry",
  auth,
  validate(regionValidate.updateCountry),
  regionService.updateCountry
);

/* UPDATE A CITY IN THE COUNTRY */
router.put(
  "/updateCity",
  auth,
  validate(regionValidate.updateCity),
  regionService.updateCity
);

/* DELETE A REGION */
router.delete("/deleteRegion", auth, regionService.deleteRegion);

/* DELETE A COUNTRY IN THE REGION */
router.delete("/deleteCountry", auth, regionService.deleteCountry);

/* DELETE A CITY IN THE COUNTRY */
router.delete("/deleteCity", auth, regionService.deleteCity);

module.exports = router;
