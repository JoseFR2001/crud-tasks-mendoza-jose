import { body, param } from "express-validator";
import TaskType from "../../models/task_type.model.js";
import { Op } from "sequelize";

export const createTaskTypevalidations = [
  body("task_type")
    .trim()
    .notEmpty()
    .withMessage("El tipo de tarea es obligatorio")
    .isString()
    .withMessage("Debe ser una cadena de caracteres")
    .isLength({ min: 1, max: 100 })
    .withMessage("El maximo de caracteres es de 100")
    .custom(async (task_type) => {
      const taskTypeExiste = await TaskType.findOne({
        where: { task_type },
      });
      if (taskTypeExiste) {
        throw new Error("Este tipo de tarea ya existe");
      }
    })
    .escape(),
];

export const getByPkTaskTypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      const taskType = await TaskType.findByPk(id);
      if (!taskType) {
        throw new Error("El tipo de tarea no existe");
      }
    }),
];

export const updateTaskTypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      const taskType = await TaskType.findByPk(id);
      if (!taskType) {
        throw new Error("El tipo de tarea no existe");
      }
    }),
  body("task_type")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El tipo de tarea es obligatorio")
    .isString()
    .withMessage("Debe ser una cadena de caracteres")
    .isLength({ min: 1, max: 100 })
    .withMessage("El maximo de caracteres es de 100")
    .custom(async (task_type, { req }) => {
      const taskTypeExiste = await TaskType.findOne({
        where: { task_type, id: { [Op.ne]: req.params.id } },
      });
      if (taskTypeExiste) {
        throw new Error("Este tipo de tarea ya existe");
      }
    })
    .escape(),
];

export const deleteTaskTypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      const taskType = await TaskType.findByPk(id);
      if (!taskType) {
        throw new Error("El tipo de tarea no existe");
      }
    }),
];
