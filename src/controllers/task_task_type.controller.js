import { matchedData } from "express-validator";
import Task from "../models/task.model.js";
import TaskTaskType from "../models/task_task_type.model.js";
import TaskType from "../models/task_type.model.js";

export const createTaskTasktype = async (req, res) => {
  try {
    const create = await TaskTaskType.create(req.body);
    return res.status(201).json(create);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllTaskTaskTypes = async (req, res) => {
  try {
    const traerTodo = await TaskTaskType.findAll({
      attributes: ["id"],
      include: [
        { model: Task, as: "task" },
        { model: TaskType, as: "task_type" },
      ],
    });
    if (traerTodo.length == 0)
      return res.json({
        message: "No existen relaciones",
      });
    return res.status(200).json(traerTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdTaskTasktype = async (req, res) => {
  try {
    const traerById = await TaskTaskType.findByPk(req.params.id, {
      attributes: ["id"],
      include: [
        { model: Task, as: "task" },
        { model: TaskType, as: "task_type" },
      ],
    });
    if (!traerById)
      return res.status(404).json({ message: "Relación no encontrada" });
    return res.status(200).json(traerById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskTasktype = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ message: "La data tiene que ser correcta" });
    }
    const [update] = await TaskTaskType.update(data, {
      where: { id: req.params.id },
    });
    if (update === 0)
      return res.status(404).json({ message: "No se encontro la relación" });
    return res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTaskTasktype = async (req, res) => {
  try {
    const eliminar = await TaskTaskType.destroy({
      where: { id: req.params.id },
    });
    if (!eliminar)
      return res.status(404), json({ message: "No se encontro relación" });
    return res.status(200).json({ message: "Relación eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
