import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Task from "./task.model.js";
import TaskType from "./tasktype.model.js";

const TaskTaskType = sequelize.define(
  "TaskTaskType",
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

Task.belongsToMany(TaskType, { through: TaskTaskType, foreignKey: "task_id" });

TaskType.belongsToMany(Task, {
  through: TaskTaskType,
  foreignKey: "tasktype_id",
});
