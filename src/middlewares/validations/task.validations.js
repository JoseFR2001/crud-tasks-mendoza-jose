import { body, param } from "express-validator";
import Task from "../../models/task.model.js";
import User from "../../models/user.model.js";
import { Op } from "sequelize";

export const createTaskValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isString()
    .withMessage("El titulo debe ser una cadena de caracteres")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "El titulo debe tener un minimo de 5 caracteres y un maximo de 100"
    )
    .custom(async (title) => {
      const tituloExiste = await Task.findOne({ where: { title } });
      if (tituloExiste) {
        throw new Error("El titulo debe ser unico");
      }
    })
    .escape(),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isString()
    .withMessage("La descripcion debe ser una cadena de caracteres")
    .isLength({ min: 1, max: 100 })
    .withMessage("La descripcion debe tener un maximo de 100 caracteres"),
  body("is_complete")
    .trim()
    .notEmpty()
    .withMessage("Is complete no debe ser vacio")
    .isBoolean()
    .withMessage("Is complete debe ser booleano")
    .escape(),
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
    })
    .escape(),
];

export const getByPkTaskValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("La tarea no existe");
      }
    }),
];

export const updateTaskValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("La tarea no existe");
      }
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isString()
    .withMessage("El titulo debe ser una cadena de caracteres")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "El titulo debe tener un minimo de 5 caracteres y un maximo de 100"
    )
    .custom(async (title, { req }) => {
      const tituloExiste = await Task.findOne({
        where: { title, id: { [Op.ne]: req.params.id } },
      });
      if (tituloExiste) {
        throw new Error("El titulo debe ser unico");
      }
    })
    .escape(),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isString()
    .withMessage("La descripcion debe ser una cadena de caracteres")
    .isLength({ min: 1, max: 100 })
    .withMessage("La descripcion debe tener un maximo de 100 caracteres")
    .escape(),
  body("is_complete")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Is complete no debe ser vacio")
    .isBoolean()
    .withMessage("Is complete debe ser booleano")
    .escape(),
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
    })
    .escape(),
];

export const deleteTaskValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("La tarea no existe");
      }
    }),
];
