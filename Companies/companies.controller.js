const express = require("express");

const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const companyValidate = require("./companies.validate");
const companyService = require("./companies.service");

const router = express.Router();

/* GET ALL COMPANIES */
router.get("/all", auth, companyService.all);

/* GET A COMPANY BY EMAIL */
router.get(
  "/byemail",
  validate(companyValidate.byEmail),
  auth,
  companyService.byEmail
);

/*REGISTER A COMPANY*/
router.post(
  "/register",
  validate(companyValidate.register),
  auth,
  companyService.register
);

/* UPDATE A COMPANY BY EMAIL */
router.put(
  "/update",
  validate(companyValidate.update),
  auth,
  companyService.update
);

/* DELETE A COMPANY BY EMAIL */
router.delete(
  "/delete",
  validate(companyValidate.delete),
  auth,
  companyService.remove
);

module.exports = router;
