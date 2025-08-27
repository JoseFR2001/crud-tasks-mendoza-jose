import { body, param } from "express-validator";
import AdditionalInfo from "../../models/additional_info.model.js";
import User from "../../models/user.model.js";

export const createAddInfoValidations = [
  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("El numero telefonico es obligatorio")
    .isString()
    .withMessage("El numero telefonico debe tener el formato correcto")
    .isLength({ min: 1, max: 20 })
    .withMessage("El numero telefonico no debe tener mas de 20 caracteres")
    .custom(async (phone_number) => {
      const numeroExiste = await AdditionalInfo.findOne(phone_number);
      if (numeroExiste) {
        throw new Error("El numero ya pertenece a otro usuario");
      }
    }),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("La direccion debe ser obligatoria")
    .isString()
    .withMessage("La direccion debe ser una cadena de caracteres")
    .isLength({ min: 1, max: 100 })
    .withMessage("La direccion no puede tener mas de 100 caracteres"),
  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("Debe existir un usuario")
    .isInt({ min: 1 })
    .withMessage("El user_id debe ser un entero positivo")
    .custom(async (user_id) => {
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const getByPkAddInfoValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const addInf = await AdditionalInfo.findByPk(id);
      if (!addInf) {
        throw new Error("La informacion adicional no existe");
      }
    }),
];

export const updteAddInfValidations = [
  body("phone_number")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El numero telefonico es obligatorio")
    .isString()
    .withMessage("El numero telefonico debe tener el formato correcto")
    .isLength({ min: 1, max: 20 })
    .withMessage("El numero telefonico no debe tener mas de 20 caracteres")
    .custom(async (phone_number) => {
      const numeroExiste = await AdditionalInfo.findOne(phone_number);
      if (numeroExiste) {
        throw new Error("El numero ya pertenece a otro usuario");
      }
    }),
  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La direccion debe ser obligatoria")
    .isString()
    .withMessage("La direccion debe ser una cadena de caracteres")
    .isLength({ min: 1, max: 100 })
    .withMessage("La direccion no puede tener mas de 100 caracteres"),
  body("user_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Debe existir un usuario")
    .isInt({ min: 1 })
    .withMessage("El user_id debe ser un entero positivo")
    .custom(async (user_id) => {
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const deleteAddInfValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const addInf = await AdditionalInfo.findByPk(id);
      if (!addInf) {
        throw new Error("La informacion adicional no existe");
      }
    }),
];
