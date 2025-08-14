import { Router } from "express";
import {
  createTaskTasktype,
  getAllTaskTaskTypes,
  getByIdTaskTasktype,
} from "../controllers/tasktasktype.controller.js";

const routerTaskTaksType = Router();

routerTaskTaksType.post("/", createTaskTasktype);
routerTaskTaksType.get("/", getAllTaskTaskTypes);
routerTaskTaksType.get("/", getByIdTaskTasktype);

export default routerTaskTaksType;
