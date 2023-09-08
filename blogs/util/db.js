const Sequelize = require("sequelize")
const { DATABASE_URL } = require("./config")

const { Umzug, SequelizeStorage } = require("umzug")

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await migrate()
    console.log("Connected")
  } catch (err) {
    console.log(`Error occurred: ${err}`)
    return process.exit(1)
  }
}

const migrationConf = {
  migrations: { glob: "migrations/*.js" },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const migrate = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log("Migrations successful", {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }
