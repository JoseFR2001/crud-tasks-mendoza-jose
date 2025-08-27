import { matchedData } from "express-validator";
import AdditionalInfo from "../models/additional_info.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const crearUsusario = await User.create(req.body);
    return res.status(201).json(crearUsusario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: { exclude: ["user_id", "id"] },
        },
        {
          model: AdditionalInfo,
          as: "additional_info",
          attributes: { exclude: ["id", "user_id"] },
        },
      ],
    });
    if (!user) return res.status(404).json({ message: "El usuario no existe" });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Task,
          as: "tasks",
          attributes: { exclude: ["user_id", "id"] },
        },
        {
          model: AdditionalInfo,
          as: "additional_info",
          attributes: { exclude: ["id", "user_id"] },
        },
      ],
    });
    if (users.length == 0) return res.json({ message: "No existen usuarios" });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ message: "La data tiene que ser correcta" });
    }

    const [update] = await User.update(data, {
      where: { id: req.params.id },
    });
    if (update === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      const actualizarUser = await User.findByPk(req.params.id);
      return res.status(200).json(actualizarUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const eliminarUsusario = await User.destroy({
      where: { id: req.params.id },
    });
    if (!eliminarUsusario)
      return res.status(404).json({ message: "El usuario no existe" });
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
