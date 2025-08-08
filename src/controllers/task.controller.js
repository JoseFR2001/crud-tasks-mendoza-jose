import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if (
      title === "" ||
      title === undefined ||
      description === "" ||
      description === undefined
    )
      return res.status(400).json({
        message: "Los campos de title y description no deben estar vacios",
      });

    const tareaExiste = await Task.findOne({ where: { title: title } });
    if (tareaExiste)
      return res.status(400).json({ message: "La tarea ya existe" });

    if (typeof isComplete !== "boolean")
      return res
        .status(400)
        .json({ message: "isComplete debe ser un booleano" });

    const crearTarea = await Task.create(req.body);
    return res.status(201).json(crearTarea);
  } catch (error) {
    res.error(500).json({ error: error.message });
  }
};

export const getByIdTask = async (req, res) => {
  try {
    const task = await task.findByPk(req.params.id);
    if (!Task) return res.status(404).json({ message: "El tarea no existe" });
    return res.status(200).json(Task);
  } catch (error) {
    res.error(500).json({ error: error.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    res.error(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if (
      title === "" ||
      title === undefined ||
      description === "" ||
      description === undefined
    )
      return res.status(400).json({
        message: "Los campos de title y description no deben estar vacios",
      });

    const tareaExiste = await Task.findOne({ where: { title: title } });
    if (tareaExiste)
      return res.status(400).json({ message: "La tarea ya existe" });

    if (typeof isComplete !== "boolean")
      return res
        .status(400)
        .json({ message: "isComplete debe ser un booleano" });
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
    res.error(500).json({ error: error.message });
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
    res.error(500).json({ error: error.message });
  }
};
