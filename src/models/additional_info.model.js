import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./user.model.js";

const AdditionalInfo = sequelize.define(
  "additional_info",
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

AdditionalInfo.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasOne(AdditionalInfo, {
  foreignKey: "user_id",
});
