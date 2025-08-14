import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const TaskPriority = sequelize.define(
  "TaskPriority",
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
