import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getByIdUser,
  updateUser,
} from "../controllers/user.controller.js";

const routerUser = Router();

routerUser.post("/user", createUser);
routerUser.get("/user", getAllUser);
routerUser.get("/user/:id", getByIdUser);
routerUser.put("/user/:id", updateUser);
routerUser.delete("/user/:id", deleteUser);

export default routerUser;
