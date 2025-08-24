import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./user.model.js";

const Task = sequelize.define(
  "task",
  {
    title: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    description: { type: DataTypes.STRING(100), allowNull: false },
    is_complete: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    timestamps: false,
  }
);

export default Task;

Task.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});

User.hasMany(Task, { foreignKey: "user_id", as: "tasks" });
