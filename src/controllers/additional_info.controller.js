import { Op } from "sequelize";
import AdditionalInfo from "../models/additional_info.model.js";
import User from "../models/user.model.js";

export const createAdditionalInfo = async (req, res) => {
  try {
    const { phone_number, address, user_id } = req.body;
    if (!phone_number || !address)
      return res
        .status(400)
        .json({ message: "Los campos no deben estar vacíos" });

    if (!user_id || !Number.isInteger(user_id))
      return res
        .status(400)
        .json({ message: "Es necesario asignar un usuario a la tarea" });

    const usuario = await User.findByPk(user_id);
    if (!usuario) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    const usuarioExistente = await AdditionalInfo.findOne({
      where: { user_id: user_id },
    });

    if (usuarioExistente)
      return res.status(400).json({
        message: "La información adicional ya pertenece a un usuario",
      });

    if (phone_number.length > 20)
      return res.status(400).json({
        message: "El número de teléfono no debe tener más de 20 caracteres",
      });

    const telefonoUnico = await AdditionalInfo.findOne({
      where: { phone_number: phone_number },
    });
    if (telefonoUnico)
      return res
        .status(400)
        .json({ message: "Ya existe ese número de teléfono" });
    if (address.length > 100)
      return res
        .status(400)
        .json({ message: "La dirección no debe tener más de 100 caracteres" });

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

//Las siguientes rutas no son necesarias; las creé porque no me di cuenta de que solo se requieren los métodos POST y GET

export const updateAdditionalInfo = async (req, res) => {
  try {
    const { phone_number, address, user_id } = req.body;
    if (!phone_number || !address)
      return res
        .status(400)
        .json({ message: "Los campos no deben estar vacíos" });

    if (!user_id || !Number.isInteger(user_id))
      return res
        .status(400)
        .json({ message: "Es necesario asignar un usuario a la tarea" });

    const usuario = await User.findByPk(user_id);
    if (!usuario) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    const usuarioExistente = await AdditionalInfo.findOne({
      where: { user_id: user_id },
    });

    if (usuarioExistente)
      return res.status(400).json({
        message: "La información adicional ya pertenece a un usuario",
      });

    if (phone_number.length > 20)
      return res.status(400).json({
        message: "El número de teléfono no debe tener más de 20 caracteres",
      });

    const telefonoUnico = await AdditionalInfo.findOne({
      where: { phone_number: phone_number, id: { [Op.ne]: req.params.id } },
    });
    if (telefonoUnico)
      return res
        .status(400)
        .json({ message: "Ya existe ese número de teléfono" });
    if (address.length > 100)
      return res
        .status(400)
        .json({ message: "La dirección no debe tener más de 100 caracteres" });

    const [update] = await AdditionalInfo.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const infoActualizado = await AdditionalInfo.findByPk(req.params.id);
      return res.status(200).json(infoActualizado);
    } else {
      return res
        .status(404)
        .json({ message: "No existe información adicional" });
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
