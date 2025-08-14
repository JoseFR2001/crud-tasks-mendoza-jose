import { Router } from "express";
import {
  createTaskTasktype,
  getAllTaskTaskTypes,
  getByIdTaskTasktype,
} from "../controllers/tasktasktype.controller.js";

const routerTaskTaksType = Router();

routerTaskTaksType.post("/typetypetype", createTaskTasktype);
routerTaskTaksType.get("/typetypetype", getAllTaskTaskTypes);
routerTaskTaksType.get("/typetypetype/:id", getByIdTaskTasktype);

export default routerTaskTaksType;
