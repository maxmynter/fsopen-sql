const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

class Disabled extends Model {}

Disabled.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    disabled: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "disabled" }
)

module.exports = Disabled
