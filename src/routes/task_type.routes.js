import { Router } from "express";
import {
  createTaskType,
  deleteTaskType,
  getAllTaskType,
  getByAIdTaskType,
  updateTaskType,
} from "../controllers/task_type.controller.js";

const routerTaskType = Router();

routerTaskType.post("/tasktype", createTaskType),
  routerTaskType.get("/tasktype", getAllTaskType),
  routerTaskType.get("/tasktype/:id", getByAIdTaskType),
  routerTaskType.put("/taskType/:id", updateTaskType),
  routerTaskType.delete("/tasktype/:id", deleteTaskType);

export default routerTaskType;
