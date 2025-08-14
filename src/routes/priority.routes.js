import { Router } from "express";
import {
  createPriority,
  deletePriority,
  getAllPriority,
  getByAIdPriority,
  updatePriority,
} from "../controllers/priority.controller";

const routerPriority = Router();

routerPriority.post("/priority", createPriority),
  routerPriority.get("/priority", getAllPriority),
  routerPriority.get("/priority/:id", getByAIdPriority),
  routerPriority.put("/priority/:id", updatePriority),
  routerPriority.delete("/priority/:id", deletePriority);

export default routerPriority;
