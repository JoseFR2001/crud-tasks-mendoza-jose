import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TaskType = sequelize.define(
  "task_type",
  {
    task_type: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  },
  {
    paranoid: true,
    createdAt: false,
    updatedAt: false,
  }
);

export default TaskType;
