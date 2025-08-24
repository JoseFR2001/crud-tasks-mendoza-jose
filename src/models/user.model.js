import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
  "user",
  {
    name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    paranoid: true,
  }
);

export default User;
