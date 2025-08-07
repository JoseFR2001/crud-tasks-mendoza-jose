import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const task = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  description: { type: DataTypes.STRING(100), allowNull: false },
  isComplete: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default task