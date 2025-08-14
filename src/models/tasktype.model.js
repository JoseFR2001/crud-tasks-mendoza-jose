import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TaskType = sequelize.define(
  "TaskType",
  {
    task_type: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  },
  {
    timestamps: false,
  }
);

export default TaskType;
