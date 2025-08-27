import { body, param } from "express-validator";
import User from "../../models/user.model.js";
import { Op } from "sequelize";

export const createUserValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener un minimo 3 caracteres y un maximo 100")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Tiene que ser email valido")
    .isLength({ min: 10, max: 100 })
    .withMessage("El email debe tener un minimo 10 caracteres y un maximo 100")
    .custom(async (email) => {
      const emailExiste = await User.findOne({ where: { email } });
      if (emailExiste) {
        throw new Error("El email pertenece a otro usuario");
      }
    })
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isString()
    .withMessage("La constrseña debe ser una cadena de caracteres")
    .isLength({ min: 8, max: 100 })
    .withMessage(
      "La contraseña debe tener un minimo 8 caracteres y un maximo 100"
    )
    .escape(),
];

export const getByPkUserValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const userExiste = await User.findByPk(id);
      if (!userExiste) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const updateUserValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const userExiste = await User.findByPk(id);
      if (!userExiste) {
        throw new Error("El usuario no existe");
      }
    }),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser una cadena de caracteres")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener un minimo 3 caracteres y un maximo 100")
    .escape(),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Tiene que ser email valido")
    .isLength({ min: 10, max: 100 })
    .withMessage("El email debe tener un minimo 10 caracteres y un maximo 100")
    .custom(async (email, { req }) => {
      const emailExiste = await User.findOne({
        where: { email, id: { [Op.ne]: req.params.id } },
      });
      if (emailExiste) {
        throw new Error("El email pertenece a otro usuario");
      }
    })
    .escape(),
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
    )
    .escape(),
];

export const deleteUserValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const userExiste = await User.findByPk(id);
      if (!userExiste) {
        throw new Error("El usuario no existe");
      }
    }),
];
