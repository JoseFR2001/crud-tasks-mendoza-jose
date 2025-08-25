import { Router } from "express";
import {
  createTaskType,
  deleteTaskType,
  getAllTaskType,
  getByAIdTaskType,
  updateTaskType,
} from "../controllers/task_type.controller.js";
import {
  createTaskTypevalidations,
  deleteTaskTypeValidations,
  getByPkTaskTypeValidations,
  updateTaskTypeValidations,
} from "../middlewares/validations/task_type.validations.js";
import controller from "../middlewares/validator.js";

const routerTaskType = Router();

routerTaskType.post(
  "/tasktype",
  createTaskTypevalidations,
  controller,
  createTaskType
),
  routerTaskType.get("/tasktype", getAllTaskType),
  routerTaskType.get(
    "/tasktype/:id",
    getByPkTaskTypeValidations,
    controller,
    getByAIdTaskType
  ),
  routerTaskType.put(
    "/taskType/:id",
    updateTaskTypeValidations,
    controller,
    updateTaskType
  ),
  routerTaskType.delete(
    "/tasktype/:id",
    deleteTaskTypeValidations,
    controller,
    deleteTaskType
  );

export default routerTaskType;
