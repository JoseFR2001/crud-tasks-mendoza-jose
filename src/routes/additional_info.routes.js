import { Router } from "express";
import {
  createAdditionalInfo,
  deleteAdditionalInfo,
  getAllAdditionalInfo,
  getByAIdAdditionalInfo,
  updateAdditionalInfo,
} from "../controllers/additional_info.controller.js";
import {
  createAddInfoValidations,
  deleteAddInfValidations,
  getByPkAddInfoValidations,
  updteAddInfValidations,
} from "../middlewares/validations/additional_info.validations.js";
import controller from "../middlewares/validator.js";

const routerAdditionalInfo = Router();

routerAdditionalInfo.post(
  "/additionalInfo",
  createAddInfoValidations,
  controller,
  createAdditionalInfo
),
  routerAdditionalInfo.get("/additionalInfo", getAllAdditionalInfo),
  routerAdditionalInfo.get(
    "/additionalInfo/:id",
    getByPkAddInfoValidations,
    controller,
    getByAIdAdditionalInfo
  ),
  routerAdditionalInfo.put(
    "/additionalInfo/:id",
    updteAddInfValidations,
    controller,
    updateAdditionalInfo
  ),
  routerAdditionalInfo.delete(
    "/additionalInfo/:id",
    deleteAddInfValidations,
    controller,
    deleteAdditionalInfo
  );

export default routerAdditionalInfo;
