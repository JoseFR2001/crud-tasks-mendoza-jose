import { body, param } from "express-validator";
import User from "../../models/user.model.js";

export const createUserValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener un minimo 3 caracteres y un maximo 100"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Tiene que ser email valido")
    .isLength({ min: 10, max: 100 })
    .withMessage("El email debe tener un minimo 10 caracteres y un maximo 100")
    .custom(async (email) => {
      try {
        const emailExiste = await User.findOne({ where: { email } });
        if (emailExiste) throw new Error("Email ya pertenece a otro usuario");
      } catch (error) {
        throw new Error("Error checking email availability");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isString()
    .withMessage("La constrseña debe ser una cadena de caracteres")
    .isLength({ min: 8, max: 100 })
    .withMessage(
      "La contraseña debe tener un minimo 8 caracteres y un maximo 100"
    ),
];

export const getByPkUserValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      try {
        const usuario = await User.findByPk(id);
        if (!usuario) throw new Error("El usuario no existe");
      } catch (error) {
        throw new Error("Error checking email availability");
      }
    }),
];

export const updateUserValidations = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener un minimo 3 caracteres y un maximo 100"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Tiene que ser email valido")
    .isLength({ min: 10, max: 100 })
    .withMessage("El email debe tener un minimo 10 caracteres y un maximo 100")
    .custom(async (email) => {
      try {
        const emailExiste = await User.findOne({ where: { email } });
        if (emailExiste) throw new Error("Email ya pertenece a otro usuario");
      } catch (error) {
        throw new Error("Error checking email availability");
      }
    }),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isString()
    .withMessage("La constrseña debe ser una cadena de caracteres")
    .isLength({ min: 8, max: 100 })
    .withMessage(
      "La contraseña debe tener un minimo 8 caracteres y un maximo 100"
    ),
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      try {
        const usuario = await User.findByPk(id);
        if (!usuario) throw new Error("El usuario no existe");
      } catch (error) {
        throw new Error("Error checking email availability");
      }
    }),
];

export const deleteUserValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      try {
        const usuario = await User.findByPk(id);
        if (!usuario) throw new Error("El usuario no existe");
      } catch (error) {
        throw new Error("Error checking email availability");
      }
    }),
];
