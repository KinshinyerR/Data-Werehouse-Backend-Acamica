const { body } = require("express-validator");

const companyValidate = {
  byEmail: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
  register: [
    body("name").exists().isString().trim().withMessage("Nombre invalido"),
    body("address")
      .exists()
      .isString()
      .trim()
      .withMessage("Dirección invalida"),
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
    body("phone")
      .optional()
      .isNumeric()
      .trim()
      .withMessage("Teléfono invalido"),
    body("city").exists().isString().trim().withMessage("Ciudad invalido"),
  ],
  update: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
  delete: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
};

module.exports = companyValidate;
