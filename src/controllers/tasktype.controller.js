import { Op } from "sequelize";
import TaskType from "../models/tasktype.model.js";

export const createTaskType = async (req, res) => {
  try {
    const { task_type } = req.body;
    if (!task_type)
      return res.status(400).json({ message: "No debe ser vacio" });

    if (task_type.length > 100)
      return res
        .status(100)
        .json({ message: "No debe tener mas de 100 caracteres" });

    const typeUnique = await TaskType.findOne({
      where: { task_type: task_type },
    });
    if (typeUnique) return res.status(400).json({ message: "Ya existe tipo" });

    const typeTask = await TaskType.create(req.body);
    return res.status(201).json(typeTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTaskType = async (req, res) => {
  try {
    const getAll = TaskType.findAll();
    if (getAll.length == 0)
      return res.json({
        message: "No existe type",
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
      return res.status(404).json({ message: "No existe ese type" });
    return res.status(200).json(getById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskType = async (req, res) => {
  try {
    const { task_type } = req.body;
    if (!task_type)
      return res.status(400).json({ message: "No debe ser vacio" });

    if (task_type.length > 100)
      return res
        .status(100)
        .json({ message: "No debe tener mas de 100 caracteres" });

    const typeUnique = await TaskType.findOne({
      where: { task_type: task_type, id: { [Op.ne]: req.params.id } },
    });
    if (typeUnique) return res.status(400).json({ message: "Ya existe tipo" });

    const [update] = await TaskType.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const typeActualizado = await TaskType.findByPk(req.params.id);
      return res.status(200).json(typeActualizado);
    } else {
      return res.status(404).json({ message: "No existe type" });
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
    return res.status(200).json({ message: "Type eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
