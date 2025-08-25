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
      try {
        const numeroExiste = await AdditionalInfo.findOne(phone_number);
        if (numeroExiste) {
          return Promise.reject("El numero ya pertenece a otro usuario");
        }
      } catch (error) {
        return Promise.reject("Error checking additional info availability");
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
      try {
        const user = await User.findByPk(user_id);
        if (!user) {
          return Promise.reject("El usuario no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking user availability");
      }
    }),
];

export const getByPkAddInfoValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      try {
        const addInf = await AdditionalInfo.findByPk(id);
        if (!addInf) {
          return Promise.reject("La informacion adicional no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
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
      try {
        const numeroExiste = await AdditionalInfo.findOne(phone_number);
        if (numeroExiste) {
          return Promise.reject("El numero ya pertenece a otro usuario");
        }
      } catch (error) {
        return Promise.reject("Error checking additional info availability");
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
      try {
        const user = await User.findByPk(user_id);
        if (!user) {
          return Promise.reject("El usuario no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking user availability");
      }
    }),
];

export const deleteAddInfValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      try {
        const addInf = await AdditionalInfo.findByPk(id);
        if (!addInf) {
          return Promise.reject("La informacion adicional no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
      }
    }),
];
