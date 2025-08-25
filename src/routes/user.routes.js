import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getByIdUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  createUserValidations,
  deleteUserValidations,
  getByPkUserValidations,
  updateUserValidations,
} from "../middlewares/validations/user.validations.js";
import controller from "../middlewares/validator.js";

const routerUser = Router();

routerUser.post("/user", createUserValidations, controller, createUser);
routerUser.get("/user", getAllUser);
routerUser.get("/user/:id", getByPkUserValidations, controller, getByIdUser);
routerUser.put("/user/:id", updateUserValidations, controller, updateUser);
routerUser.delete("/user/:id", deleteUserValidations, controller, deleteUser);

export default routerUser;
