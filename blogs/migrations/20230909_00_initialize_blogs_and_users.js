const { DataTypes } = require("sequelize")
const { sequelize } = require("../util/db")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("blogs", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      author: { type: DataTypes.TEXT },
      url: { type: DataTypes.TEXT, allowNull: false },
      title: { type: DataTypes.TEXT, allowNull: false },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
      createdAt: { type: DataTypes.DATE, defaultValue: sequelize.fn("NOW") },
      updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.fn("NOW") },
    })
    await queryInterface.createTable("users", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.TEXT, allowNull: false },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: { type: DataTypes.TEXT, allowNull: false },
      createdAt: { type: DataTypes.DATE, defaultValue: sequelize.fn("NOW") },
      updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.fn("NOW") },
    })

    await queryInterface.addColumn("blogs", "user_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("blogs")
    await queryInterface.dropTable("users")
  },
}
