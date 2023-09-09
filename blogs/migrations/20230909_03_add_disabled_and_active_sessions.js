const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("active_sessions", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      token: { type: DataTypes.TEXT, allowNull: false },
    })
    await queryInterface.createTable("disableds", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      disabled: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("active_sessions")
    await queryInterface.dropTable("disableds")
  },
}
