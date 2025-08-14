import { Router } from "express";
import {
  createAdditionalInfo,
  deleteAdditionalInfo,
  getAllAdditionalInfo,
  getByAIdAdditionalInfo,
  updateAdditionalInfo,
} from "../controllers/additional_info.controller";

const routerAdditionalInfo = Router();

routerAdditionalInfo.post("/additionalInfo", createAdditionalInfo),
  routerAdditionalInfo.get("/additionalInfo", getAllAdditionalInfo),
  routerAdditionalInfo.get("/additionalInfo/:id", getByAIdAdditionalInfo),
  routerAdditionalInfo.put("/additionalInfo/:id", updateAdditionalInfo),
  routerAdditionalInfo.delete("/additionalInfo/:id", deleteAdditionalInfo);

export default routerAdditionalInfo;
