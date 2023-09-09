const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

class ActiveSession extends Model {}

ActiveSession.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "active_session",
  }
)

module.exports = ActiveSession
