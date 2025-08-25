import { body, param } from "express-validator";
import Task from "../../models/task.model.js";
import User from "../../models/user.model.js";

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
      try {
        const tituloExiste = await Task.findOne({ where: { title } });
        if (tituloExiste) {
          return Promise.reject("El titulo debe ser unico");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
      }
    }),
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
    .withMessage("Is complete debe ser booleano"),
  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("Debe existir un usuario")
    .isInt()
    .withMessage("El user_id debe ser un entero")
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

export const getByPkTaskValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      try {
        const task = await Task.findByPk(id);
        if (!task) {
          return Promise.reject("La tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
      }
    }),
];

export const updateTaskValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      try {
        const task = await Task.findByPk(id);
        if (!task) {
          return Promise.reject("La tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
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
    .custom(async (title) => {
      try {
        const tituloExiste = await Task.findOne({ where: { title } });
        if (tituloExiste) {
          return Promise.reject("El titulo debe ser unico");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
      }
    }),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isString()
    .withMessage("La descripcion debe ser una cadena de caracteres")
    .isLength({ min: 1, max: 100 })
    .withMessage("La descripcion debe tener un maximo de 100 caracteres"),
  body("is_complete")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Is complete no debe ser vacio")
    .isBoolean()
    .withMessage("Is complete debe ser booleano"),
  body("user_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Debe existir un usuario")
    .isInt()
    .withMessage("El user_id debe ser un entero")
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

export const deleteTaskValidations = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un número entero")
    .custom(async (id) => {
      try {
        const task = await Task.findByPk(id);
        if (!task) {
          return Promise.reject("La tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
      }
    }),
];
