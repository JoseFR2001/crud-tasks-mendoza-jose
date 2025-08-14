import Task from "../models/task.model.js";
import TaskTaskType from "../models/tasktasktype.model.js";
import TaskType from "../models/tasktype.model.js";

export const createTaskTasktype = async (req, res) => {
  try {
    const create = await TaskTaskType.create(req.body);
    return res.status(201).json(create);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTaskTaskTypes = async (req, res) => {
  try {
    const traerTodo = await TaskTaskType.findAll({
      include: [{ model: Task }, { model: TaskType }],
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
