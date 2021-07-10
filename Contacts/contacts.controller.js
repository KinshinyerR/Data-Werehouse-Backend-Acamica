const express = require("express");
let multer = require("multer");
let upload = multer({ dest: "upload/" });

const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const contactValidate = require("./contacts.validate");
const contactService = require("./contacts.service");

const router = express.Router();

/* GET ALL CONTACTS */
router.get("/all"/*, auth*/, contactService.all);

/* GET A CONTACTS BY EMAIL */
router.get(
  "/byemail",
  validate(contactValidate.byEmail),
  auth,
  contactService.byEmail
);

/*REGISTER A CONTACT*/
router.post(
  "/register",
  // validate(contactValidate.register),
  auth,
  contactService.register
);

/* UPDATE A CONTACT BY EMAIL */
router.put(
  "/update",
  validate(contactValidate.update),
  auth,
  contactService.update
);

/* DELETE A CONTACT BY EMAIL */
router.delete(
  "/delete",
  validate(contactValidate.delete),
  auth,
  contactService.remove
);

router.post("/upload", contactService.uploadFile);

module.exports = router;
