const express = require("express");

const auth = require("../middlewares/auth");
const verifyPerfil = require("../middlewares/perfil");
const validate = require("../middlewares/validate");
const userValidate = require("./users.validate");
const userService = require("./users.service");

const router = express.Router();

/* REGISTER A USER */
router.post(
  "/register/admin",
  validate(userValidate.register),
  userService.register
);

/* REGISTER A USER */
router.post(
  "/register",
  validate(userValidate.register),
  auth,
  verifyPerfil(["admin"]),
  userService.register
);

/* LOGIN USER */
router.post("/login", validate(userValidate.login), userService.login);

/* GET ALL USER */
router.get("/all", auth, verifyPerfil(["admin"]), userService.all);

/* GET A USER BY EMAIL */
router.get(
  "/byemail",
  auth,
  verifyPerfil(["admin"]),
  validate(userValidate.byEmail),
  userService.byEmail
);

/* GET A USER BY ID */
router.get("/profile", auth, userService.getProfile);

/* UPDATE A USER BY EMAIL */
router.put(
  "/update",
  validate(userValidate.update),
  auth,
  verifyPerfil(["admin"]),
  userService.update
);

/* DELETE A USER BY EMAIL */
router.delete(
  "/delete",
  auth,
  verifyPerfil(["admin"]),
  validate(userValidate.delete),
  userService.remove
);

module.exports = router;
