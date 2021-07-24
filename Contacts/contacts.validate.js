const { body } = require("express-validator");

const contactValidate = {
  byEmail: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
  register: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
  update: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
  delete: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
};

module.exports = contactValidate;
