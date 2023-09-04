const Sequelize = require("sequelize")
const { DATABASE_URL } = require("./config")

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connected")
  } catch (err) {
    console.log(`Error occurred: ${err}`)
    return process.exit(1)
  }
}

module.exports = { connectToDatabase, sequelize }
