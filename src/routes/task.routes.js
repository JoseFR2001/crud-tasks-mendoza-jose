import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getByIdTask,
  updateTask,
} from "../controllers/task.controller.js";
import {
  createTaskValidations,
  deleteTaskValidations,
  getByPkTaskValidations,
  updateTaskValidations,
} from "../middlewares/validations/task.validations.js";
import controller from "../middlewares/validator.js";

const routerTask = Router();

routerTask.post("/task", createTaskValidations, controller, createTask);
routerTask.get("/task", getAllTask);
routerTask.get("/task/:id", getByPkTaskValidations, controller, getByIdTask);
routerTask.put("/task/:id", updateTaskValidations, controller, updateTask);
routerTask.delete("/task/:id", deleteTaskValidations, controller, deleteTask);

export default routerTask;
