import { Router } from "express";
import {
  createTaskTasktype,
  deleteTaskTasktype,
  getAllTaskTaskTypes,
  getByIdTaskTasktype,
  updateTaskTasktype,
} from "../controllers/task_task_type.controller.js";

const routerTaskTaksType = Router();

routerTaskTaksType.post("/tasktasktype", createTaskTasktype);
routerTaskTaksType.get("/tasktasktype", getAllTaskTaskTypes);
routerTaskTaksType.get("/tasktasktype/:id", getByIdTaskTasktype);
routerTaskTaksType.put("/tasktasktype/:id", updateTaskTasktype);
routerTaskTaksType.delete("/tasktasktype/:id", deleteTaskTasktype);

export default routerTaskTaksType;
