import { body, param } from "express-validator";
import TaskType from "../../models/task_type.model.js";

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
      try {
        const taskTypeExiste = await TaskType.findOne({ where: { task_type } });
        if (taskTypeExiste) {
          return Promise.reject("El tipo de tarea ya existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task type availability");
      }
    }),
];

export const getByPkTaskTypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      try {
        const taskType = await TaskType.findByPk(id);
        if (!taskType) {
          return Promise.reject("El tipo de tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task type availability");
      }
    }),
];

export const updateTaskTypeValidations = [
  body("task_type")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El tipo de tarea es obligatorio")
    .isString()
    .withMessage("Debe ser una cadena de caracteres")
    .isLength({ min: 1, max: 100 })
    .withMessage("El maximo de caracteres es de 100")
    .custom(async (task_type) => {
      try {
        const taskTypeExiste = await TaskType.findOne({ where: { task_type } });
        if (taskTypeExiste) {
          return Promise.reject("El tipo de tarea ya existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task type availability");
      }
    }),
];

export const deleteTaskTypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      try {
        const taskType = await TaskType.findByPk(id);
        if (!taskType) {
          return Promise.reject("El tipo de tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task type availability");
      }
    }),
];
