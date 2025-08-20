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

TaskTaskType.belongsTo(Task, {
  foreignKey: "task_id",
  as: "task",
});

TaskTaskType.belongsTo(TaskType, {
  foreignKey: "task_type_id",
  as: "task_type",
});

Task.hasMany(TaskTaskType, {
  foreignKey: "task_id",
  as: "task_task_type",
});

TaskType.hasMany(TaskTaskType, {
  foreignKey: "task_type_id",
  as: "task_task_type",
});
