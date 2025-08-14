import Task from "../models/task.model.js";
import { Op } from "sequelize";
import User from "../models/user.model.js";
import TaskType from "../models/tasktype.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, is_complete, user_id } = req.body;

    if (
      title === "" ||
      title === undefined ||
      description === "" ||
      description === undefined
    )
      return res.status(400).json({
        message: "Los campos de title y description no deben estar vacios",
      });

    if (!user_id || !Number(user_id))
      return res
        .status(400)
        .json({ message: "Se le debe asignar un usuario a la tarea" });

    const usuario = await User.findByPk(user_id);
    if (!usuario) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    if (title.length > 100)
      return res
        .status(400)
        .json({ message: "El title no debe tener más de 100 caracteres" });

    if (description.length > 100)
      return res.status(400).json({
        message: "La description no debe tener más de 100 caracteres",
      });

    const tareaExiste = await Task.findOne({ where: { title: title } });
    if (tareaExiste)
      return res.status(400).json({ message: "La tarea ya existe" });

    if (typeof is_complete !== "boolean")
      return res
        .status(400)
        .json({ message: "is_complete debe ser un booleano" });

    const crearTarea = await Task.create(req.body);
    return res.status(201).json(crearTarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
      include: [{ model: TaskType }],
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
      include: [{ model: User, attributes: { exclude: ["password"] } }],
      include: [{ model: TaskType }],
    });
    if (tasks.length == 0) return res.json({ message: "No existen tareas" });
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, is_complete, user_id } = req.body;

    if (
      title === "" ||
      title === undefined ||
      title === null ||
      description === "" ||
      description === undefined ||
      description === null
    )
      return res.status(400).json({
        message: "Los campos de title y description no deben estar vacios",
      });

    if (!user_id || !Number(user_id))
      return res
        .status(400)
        .json({ message: "Se le debe asignar un usuario a la tarea" });

    const usuario = await User.findByPk(user_id);
    if (!usuario) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    const tareaExiste = await Task.findOne({
      where: { title: title, id: { [Op.ne]: req.params.id } },
    });
    if (tareaExiste)
      return res.status(400).json({ message: "La tarea ya existe" });

    if (typeof is_complete !== "boolean")
      return res
        .status(400)
        .json({ message: "is_complete debe ser un booleano" });
    const [update] = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const actualizarTask = await Task.findByPk(req.params.id);
      return res.status(200).json(actualizarTask);
    } else {
      return res.status(404).json({ message: "Tarea no encontrada" });
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
