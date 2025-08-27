import { body, param } from "express-validator";
import Task from "../../models/task.model.js";
import TaskType from "../../models/task_type.model.js";
import TaskTaskType from "../../models/task_task_type.model.js";

export const createTaskTaskTypeValidations = [
  body("task_id")
    .trim()
    .notEmpty()
    .withMessage("El campo task_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo task_id debe ser un entero positivo")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("No existe la tarea");
      }
    })
    .escape(),
  body("task_type_id")
    .trim()
    .notEmpty()
    .withMessage("El campo task_type_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo task_type_id debe ser un entero positivo")
    .custom(async (value) => {
      const taskType = await TaskType.findByPk(value);
      if (!taskType) {
        throw new Error("El tipo de tarea no existe");
      }
    })
    .escape(),
];

export const getByPkTaskTaskTypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (value) => {
      const taskTaskType = await TaskTaskType.findByPk(value);
      if (!taskTaskType) {
        throw new Error("La relación no existe");
      }
    }),
];

export const updateTaskTasktypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (value) => {
      const taskTaskType = await TaskTaskType.findByPk(value);
      if (!taskTaskType) {
        throw new Error("La relación no existe");
      }
    }),
  body("task_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo task_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo task_id debe ser un entero positivo")
    .custom(async (value) => {
      const task = await Task.findByPk(value);
      if (!task) {
        throw new Error("La tarea no existe");
      }
    })
    .escape(),
  body("task_type_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo task_type_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo task_type_id debe ser un entero positivo")
    .custom(async (task_type_id) => {
      const taskType = await TaskType.findByPk(task_type_id);
      if (!taskType) {
        throw new Error("El tipo de tarea no existe");
      }
    })
    .escape(),
];

export const deleteTaskTasktypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      const taskTaskType = await TaskTaskType.findByPk(id);
      if (!taskTaskType) {
        throw new Error("La relación no existe");
      }
    }),
];
