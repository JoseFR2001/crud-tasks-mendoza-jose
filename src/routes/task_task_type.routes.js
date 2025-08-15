import { Router } from "express";
import {
  createTaskTasktype,
  getAllTaskTaskTypes,
  getByIdTaskTasktype,
} from "../controllers/task_task_type.controller.js";

const routerTaskTaksType = Router();

routerTaskTaksType.post("/tasktasktype", createTaskTasktype);
routerTaskTaksType.get("/tasktasktype", getAllTaskTaskTypes);
routerTaskTaksType.get("/tasktasktype/:id", getByIdTaskTasktype);

export default routerTaskTaksType;
