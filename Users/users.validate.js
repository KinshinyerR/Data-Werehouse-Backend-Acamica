const { body } = require("express-validator");

const userValidate = {
  register: [
    body("nombre").exists().isString().trim().withMessage("Nombre invalido"),
    body("apellido")
      .exists()
      .isString()
      .trim()
      .withMessage("Apellido invalido"),
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
    body("perfil").optional().isString().trim().withMessage("Perfil invalido"),
    body("password")
      .exists()
      .isLength({ min: 6 })
      .trim()
      .withMessage("Password invalido"),
  ],
  login: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
    body("password").exists(),
  ],
  byEmail: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
  update: [
    body("nombre").optional().isString().trim().withMessage("Nombre invalido"),
    body("apellido")
      .optional()
      .isString()
      .trim()
      .withMessage("Apellido invalido"),
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
    body("perfil").optional().isString().trim().withMessage("Perfil invalido"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .trim()
      .withMessage("Password invalido"),
  ],
  delete: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
};

module.exports = userValidate;
