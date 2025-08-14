import { Op } from "sequelize";
import AdditionalInfo from "../models/additional_info.model.js";

export const createAdditionalInfo = async (req, res) => {
  try {
    const { phone_number, address } = req.body;
    if (!phone_number || !address)
      return res
        .status(400)
        .json({ message: "Los campos no deben ser vacios " });

    if (phone_number.length > 20)
      return res.status(400).json({
        message: "El numero de telefono no debe tener mas de 20 caracteres",
      });

    const phoneNumberUnico = await AdditionalInfo.findOne({
      where: { phone_number: phone_number },
    });
    if (phoneNumberUnico)
      return res
        .status(400)
        .json({ message: "Ya existe ese numero de telefono" });
    if (address.length > 100)
      return res
        .status(400)
        .json({ message: "La direccion debe tener mas de 100 caracteres" });

    const informacion = await AdditionalInfo.create(req.body);
    return res.status(201).json(informacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAdditionalInfo = async (req, res) => {
  try {
    const getAll = AdditionalInfo.findAll();
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
    const getById = await AdditionalInfo.findByPk(req.params.id);
    if (!getById)
      return res
        .status(404)
        .json({ message: "Informacion adicional no existe" });
    return res.status(200).json(getById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdditionalInfo = async (req, res) => {
  try {
    const { phone_number, address } = req.body;
    if (!phone_number || !address)
      return res
        .status(400)
        .json({ message: "Los campos no deben ser vacios " });

    if (phone_number.length > 20)
      return res.status(400).json({
        message: "El numero de telefono no debe tener mas de 20 caracteres",
      });

    const phoneNumberUnico = await AdditionalInfo.findOne({
      where: { phone_number: phone_number, id: { [Op.ne]: req.params.id } },
    });
    if (phoneNumberUnico)
      return res
        .status(400)
        .json({ message: "Ya existe ese numero de telefono" });
    if (address.length > 100)
      return res
        .status(400)
        .json({ message: "La direccion debe tener mas de 100 caracteres" });

    const [update] = await AdditionalInfo.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const addInfoActualizado = await AdditionalInfo.findByPk(req.params.id);
      return res.status(200).json(addInfoActualizado);
    } else {
      return res
        .status(404)
        .json({ message: "No existe informacion adicional" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAdditionalInfo = async (req, res) => {
  try {
    const addInfoEliminado = await AdditionalInfo.destroy({
      where: { id: req.params.id },
    });
    if (!addInfoEliminado)
      return res.status(404).json({ message: "No se encontro" });
    return res.status(200).json({ message: "Informacion eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
