const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.fn("NOW") },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.fn("NOW") },
  },
  { sequelize, underscored: true, timestamps: true, modelName: "user" }
)

module.exports = User
