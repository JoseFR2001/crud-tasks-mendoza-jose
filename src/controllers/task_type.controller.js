import { matchedData } from "express-validator";
import TaskType from "../models/task_type.model.js";

export const createTaskType = async (req, res) => {
  try {
    const typeTask = await TaskType.create(req.body);
    return res.status(201).json(typeTask);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllTaskType = async (req, res) => {
  try {
    const getAll = await TaskType.findAll();
    if (getAll.length == 0)
      return res.json({
        message: "No existen tipos",
      });
    return res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByAIdTaskType = async (req, res) => {
  try {
    const getById = await TaskType.findByPk(req.params.id);
    if (!getById)
      return res.status(404).json({ message: "No existe ese tipo" });
    return res.status(200).json(getById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskType = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ message: "La data tiene que ser correcta" });
    }
    const [update] = await TaskType.update(data, {
      where: { id: req.params.id },
    });
    if (update === 0) {
      return res.status(404).json({ message: "No existe tipo" });
    } else {
      const typeActualizado = await TaskType.findByPk(req.params.id);
      return res.status(200).json(typeActualizado);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTaskType = async (req, res) => {
  try {
    const typeEliminada = await TaskType.destroy({
      where: { id: req.params.id },
    });
    if (!typeEliminada)
      return res.status(404).json({ message: "No se encontro" });
    return res.status(200).json({ message: "Tipo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
