import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Task from "./task.model.js";
import TaskType from "./task_type.model.js";

const TaskTaskType = sequelize.define(
  "task_task_type",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default TaskTaskType;

//De la forma que esta en el material, la tabla cumple con la funcion de relacionar las tablas pero al usar
//el metodo GET solo me trae el registro con las _id
//Para que funcione este metodo solo debemos usar el findAll() y no el findAll({includes : [""]})

// Task.belongsToMany(TaskType, { through: TaskTaskType, foreignKey: "task_id" });

// TaskType.belongsToMany(Task, {
//   through: TaskTaskType,
//   foreignKey: "tasktype_id",
// });

//Uso esta otra forma porque usar el metodo GET quiero que me traiga los datos de las relaciones

TaskType.hasMany(TaskTaskType, { foreignKey: "tasktype_id" });
TaskTaskType.belongsTo(TaskType, { foreignKey: "tasktype_id" });

Task.hasMany(TaskTaskType, { foreignKey: "task_id" });
TaskTaskType.belongsTo(Task, { foreignKey: "task_id" });
