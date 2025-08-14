import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Task from "./task.model.js";
import TaskType from "./tasktype.model.js";

const Task_TaskType = sequelize.define(
  "Task_TaskType",
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

export default Task_TaskType;

Task.belongsToMany(TaskType, { through: Task_TaskType, foreignKey: "task_id" });

TaskType.belongsToMany(Task, {
  through: Task_TaskType,
  foreignKey: "tasktype_id",
});
