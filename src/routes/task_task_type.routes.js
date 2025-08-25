import { Router } from "express";
import {
  createTaskTasktype,
  deleteTaskTasktype,
  getAllTaskTaskTypes,
  getByIdTaskTasktype,
  updateTaskTasktype,
} from "../controllers/task_task_type.controller.js";
import {
  createTaskTaskTypeValidations,
  deleteTaskTasktypeValidations,
  getByPkTaskTaskTypeValidations,
  updateTaskTasktypeValidations,
} from "../middlewares/validations/task_task_type.validations.js";
import controller from "../middlewares/validator.js";

const routerTaskTaksType = Router();

routerTaskTaksType.post(
  "/tasktasktype",
  createTaskTaskTypeValidations,
  controller,
  createTaskTasktype
);
routerTaskTaksType.get("/tasktasktype", getAllTaskTaskTypes);
routerTaskTaksType.get(
  "/tasktasktype/:id",
  getByPkTaskTaskTypeValidations,
  controller,
  getByIdTaskTasktype
);
routerTaskTaksType.put(
  "/tasktasktype/:id",
  updateTaskTasktypeValidations,
  controller,
  updateTaskTasktype
);
routerTaskTaksType.delete(
  "/tasktasktype/:id",
  deleteTaskTasktypeValidations,
  controller,
  deleteTaskTasktype
);

export default routerTaskTaksType;
