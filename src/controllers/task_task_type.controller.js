import Task from "../models/task.model.js";
import TaskTaskType from "../models/task_task_type.model.js";
import TaskType from "../models/task_type.model.js";

export const createTaskTasktype = async (req, res) => {
  try {
    const { task_id, tasktype_id } = req.body;
    if (
      !task_id ||
      !Number.isInteger(task_id) ||
      !tasktype_id ||
      !Number.isInteger(tasktype_id)
    )
      return res.status(400).json({
        message: "Los ID deben ser números enteros y no pueden estar vacíos",
      });

    const tarea = await Task.findByPk(task_id);
    if (!tarea) return res.status(400).json({ message: "La tarea no existe" });

    const tipoDeTarea = await TaskType.findByPk(tasktype_id);
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
      //En está parte es que si se usa la forma que está en el material, debe ser sólo findAll().
      attributes: ["id"],
      include: [{ model: Task }, { model: TaskType }],
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
    const traerById = await TaskTaskType.findByPk(
      req.params.id,
      //Lo mismo acá, sólo debe incluirse el findByPk(req.params.id)
      {
        attributes: ["id"],
        include: [{ model: Task }, { model: TaskType }],
      }
    );
    if (!traerById)
      return res.status(404).json({ message: "Relación no encontrada" });
    return res.status(200).json(traerById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
