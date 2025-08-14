import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Priority = sequelize.define(
  "Priority",
  {
    priority: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    timestamps: false,
  }
);

export default Priority;
