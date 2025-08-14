import Task from "../models/task.model.js";
import TaskTaskType from "../models/tasktasktype.model.js";
import TaskType from "../models/tasktype.model.js";

export const createTaskTasktype = async (req, res) => {
  try {
    const { task_id, tasktype_id } = req.body;
    if (!task_id || !Number(task_id) || !tasktype_id || !Number(tasktype_id))
      return res
        .status(400)
        .json({ message: "Los id tiene que ser numero y no deben ser vacio " });

    const tarea = await Task.findByPk(task_id);
    if (!tarea) return res.status(400).json({ message: "La tarea no existe" });

    const tipoDeTarea = await Task.findByPk(tasktype_id);
    if (!tipoDeTarea)
      return res.status(400).json({ message: "El tipo de tarea no existe" });

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
      // attributes: { exclude: [""] },
      include: [{ model: Task }, { model: TaskType }], //Proboca un error, no se cual
    });
    return res.status(200).json(traerTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIdTaskTasktype = async (req, res) => {
  try {
    const traerById = await TaskTaskType.findByPk(req.params.id, {
      include: [{ model: Task }, { model: TaskType }],
    });
    if (!traerById)
      return res.status(404).json({ message: "Relacion no encontrada" });
    return res.status(200).json(traerById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
