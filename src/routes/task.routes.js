import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getByIdTask,
  updateTask,
} from "../controllers/task.controller.js";

const routerTask = Router();

routerTask.post("/task", createTask);
routerTask.get("/task", getAllTask);
routerTask.get("/task/:id", getByIdTask);
routerTask.put("/task/:id", updateTask);
routerTask.delete("/task/:id", deleteTask);

export default routerTask;
