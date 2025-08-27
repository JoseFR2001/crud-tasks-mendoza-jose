import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import TaskType from "../models/task_type.model.js";
import TaskTaskType from "../models/task_task_type.model.js";
import { matchedData } from "express-validator";

export const createTask = async (req, res) => {
  try {
    const crearTarea = await Task.create(req.body);
    return res.status(201).json(crearTarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: TaskTaskType,
          as: "task_task_type",
          attributes: ["task_id"],
          include: [
            { model: TaskType, as: "task_type", attributes: ["task_type"] },
          ],
        },
      ],
    });
    if (!task) return res.status(404).json({ message: "La tarea no existe" });
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: TaskTaskType,
          as: "task_task_type",
          attributes: ["task_id"],
          include: [
            { model: TaskType, as: "task_type", attributes: ["task_type"] },
          ],
        },
      ],
    });

    if (tasks.length == 0) return res.json({ message: "No existen tareas" });
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ message: "La data tiene que ser correcta" });
    }
    const [update] = await Task.update(data, {
      where: { id: req.params.id },
    });
    if (update === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    } else {
      const actualizarTask = await Task.findByPk(req.params.id);
      return res.status(200).json(actualizarTask);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const eliminarTarea = await Task.destroy({
      where: { id: req.params.id },
    });
    if (!eliminarTarea)
      return res.status(404).json({ message: "El tarea no existe" });
    return res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
