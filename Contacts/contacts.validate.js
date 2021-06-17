const { body } = require("express-validator");

const contactValidate = {
  byEmail: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
  register: [
    body("name").exists().isString().trim().withMessage("Nombre invalido"),
    body("surname").exists().isString().trim().withMessage("Apellido invalido"),
    body("position").exists().isString().trim().withMessage("Cargo invalido"),
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
    body("company.*")
      .exists()
      .isString()
      .trim()
      .withMessage("Nombre de la compañia invalido"),
    body("region").exists().isString().trim().withMessage("Region invalida"),
    body("country").exists().isString().trim().withMessage("País invalida"),
    body("city").exists().isString().trim().withMessage("Ciudad invalida"),
    body("address")
      .exists()
      .isString()
      .trim()
      .withMessage("Dirección invalida"),
    body("interest")
      .exists()
      .isNumeric()
      .trim()
      .withMessage("Interés invalido"),
    body("channels.*.channelName")
      .exists()
      .isString()
      .trim()
      .withMessage("Nombre del canal invalido"),
    body("channels.*.account")
      .exists()
      .isString()
      .trim()
      .withMessage("Cuenta del canal invalida"),
    body("channels.*.preference")
      .exists()
      .isString()
      .trim()
      .withMessage("Prefencia del canal invalido"),
  ],
  update: [
    body("name").optional().isString().trim().withMessage("Nombre invalido"),
    body("surname")
      .optional()
      .isString()
      .trim()
      .withMessage("Apellido invalido"),
    body("position").optional().isString().trim().withMessage("Cargo invalido"),
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
    body("company.*")
      .optional()
      .isString()
      .trim()
      .withMessage("Nombre de la compañia invalido"),
    body("region").optional().isString().trim().withMessage("Region invalida"),
    body("country").optional().isString().trim().withMessage("País invalida"),
    body("city").optional().isString().trim().withMessage("Ciudad invalida"),
    body("address")
      .optional()
      .isString()
      .trim()
      .withMessage("Dirección invalida"),
    body("interest")
      .optional()
      .isNumeric()
      .trim()
      .withMessage("Interés invalido"),
    body("channels.*.channelName")
      .optional()
      .isString()
      .trim()
      .withMessage("Nombre del canal invalido"),
    body("channels.*.account")
      .optional()
      .isString()
      .trim()
      .withMessage("Cuenta del canal invalida"),
    body("channels.*.preference")
      .optional()
      .isString()
      .trim()
      .withMessage("Prefencia del canal invalido"),
  ],
  delete: [
    body("email").exists().isEmail().trim().withMessage("Email invalido"),
  ],
};

module.exports = contactValidate;
