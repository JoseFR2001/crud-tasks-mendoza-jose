import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      name === "" ||
      name === undefined ||
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined
    )
      return res
        .status(400)
        .json({ message: "Los campos no deben estar vacios" });

    if (name.length > 100)
      return res
        .status(400)
        .json({ message: "El nombre no debe tener más de 100 caracteres" });

    if (email.length > 100)
      return res
        .status(400)
        .json({ message: "El email no debe tener más de 100 caracteres" });

    const emailExiste = await User.findOne({ where: { email: email } });
    if (emailExiste)
      return res.status(400).json({ message: "Ya existe el email" });

    if (password.length > 100)
      return res
        .status(400)
        .json({ message: "El password no debe tener más de 100 caracteres" });

    const crearUsusario = await User.create(req.body);
    return res.status(201).json(crearUsusario);
  } catch (error) {
    res.error(500).json({ error: error.message });
  }
};

export const getByIdUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "El usuario no existe" });
    return res.status(200).json(user);
  } catch (error) {
    res.error(500).json({ error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    res.error(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      name === "" ||
      name === undefined ||
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined
    )
      return res
        .status(400)
        .json({ message: "Los campos no deben estar vacios" });

    if (name.length > 100)
      return res
        .status(400)
        .json({ message: "El nombre no debe tener más de 100 caracteres" });

    if (email.length > 100)
      return res
        .status(400)
        .json({ message: "El email no debe tener más de 100 caracteres" });

    const emailExiste = await User.findOne({ where: { email: email } });
    if (emailExiste)
      return res.status(400).json({ message: "Ya existe el email" });

    if (password.length > 100)
      return res
        .status(400)
        .json({ message: "El password no debe tener más de 100 caracteres" });
    const [update] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const actualizarUser = await User.findByPk(req.params.id);
      return res.status(200).json(actualizarUser);
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.error(500).json({ error: error.message });
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
    res.error(500).json({ error: error.message });
  }
};
