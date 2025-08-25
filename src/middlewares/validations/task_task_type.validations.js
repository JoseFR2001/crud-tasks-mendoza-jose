import { body } from "express-validator";
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
    .custom(async (task_id) => {
      try {
        const task = await Task.findByPk(task_id);
        if (!task) {
          return Promise.reject("La tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
      }
    }),
  body("task_type_id")
    .trim()
    .notEmpty()
    .withMessage("El campo task_type_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo task_type_id debe ser un entero positivo")
    .custom(async (task_type_id) => {
      try {
        const taskType = await TaskType.findByPk(task_type_id);
        if (!taskType) {
          return Promise.reject("El tipo de tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task typr availability");
      }
    }),
];

export const getByPkTaskTaskTypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      try {
        const tasktaskType = await TaskTaskType.findByPk(id);
        if (!tasktaskType) {
          return Promise.reject(
            "La relacion de tarea y tipo de tarea no existe"
          );
        }
      } catch (error) {
        return Promise.reject("Error checking task task type availability");
      }
    }),
];

export const updateTaskTasktypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      try {
        const tasktaskType = await TaskTaskType.findByPk(id);
        if (!tasktaskType) {
          return Promise.reject(
            "La relacion de tarea y tipo de tarea no existe"
          );
        }
      } catch (error) {
        return Promise.reject("Error checking task task type availability");
      }
    }),
  body("task_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo task_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo task_id debe ser un entero positivo")
    .custom(async (task_id) => {
      try {
        const task = await Task.findByPk(task_id);
        if (!task) {
          return Promise.reject("La tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task availability");
      }
    }),
  body("task_type_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El campo task_type_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo task_type_id debe ser un entero positivo")
    .custom(async (task_type_id) => {
      try {
        const taskType = await TaskType.findByPk(task_type_id);
        if (!taskType) {
          return Promise.reject("El tipo de tarea no existe");
        }
      } catch (error) {
        return Promise.reject("Error checking task typr availability");
      }
    }),
];

export const deleteTaskTasktypeValidations = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .custom(async (id) => {
      try {
        const tasktaskType = await TaskTaskType.findByPk(id);
        if (!tasktaskType) {
          return Promise.reject(
            "La relacion de tarea y tipo de tarea no existe"
          );
        }
      } catch (error) {
        return Promise.reject("Error checking task task type availability");
      }
    }),
];
