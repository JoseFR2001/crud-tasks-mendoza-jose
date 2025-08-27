import { matchedData } from "express-validator";
import AdditionalInfo from "../models/additional_info.model.js";
import User from "../models/user.model.js";

export const createAdditionalInfo = async (req, res) => {
  try {
    const info = await AdditionalInfo.create(req.body);
    return res.status(201).json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAdditionalInfo = async (req, res) => {
  try {
    const getAll = await AdditionalInfo.findAll({
      attributes: { exclude: ["user_id"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (getAll.length == 0)
      return res.json({
        message: "No existe informacion adicional de ningun usuario",
      });
    return res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByAIdAdditionalInfo = async (req, res) => {
  try {
    const getById = await AdditionalInfo.findByPk(req.params.id, {
      attributes: { exclude: ["user_id"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (!getById)
      return res
        .status(404)
        .json({ message: "La información adicional no existe" });
    return res.status(200).json(getById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdditionalInfo = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ message: "La data tiene que ser correcta" });
    }
    const [update] = await AdditionalInfo.update(data, {
      where: { id: req.params.id },
    });
    if (update === 0) {
      return res
        .status(404)
        .json({ message: "No existe información adicional" });
    } else {
      const infoActualizado = await AdditionalInfo.findByPk(req.params.id);
      return res.status(200).json(infoActualizado);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAdditionalInfo = async (req, res) => {
  try {
    const infoEliminado = await AdditionalInfo.destroy({
      where: { id: req.params.id },
    });
    if (!infoEliminado)
      return res.status(404).json({ message: "No se encontro" });
    return res.status(200).json({ message: "Información eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
