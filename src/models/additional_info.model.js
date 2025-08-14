import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const AdditionalInfo = sequelize.define(
  "AdditionalInfo",
  {
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    address: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    timestamps: false,
  }
);

export default AdditionalInfo;
