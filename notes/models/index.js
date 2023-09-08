const Note = require("./note")
const User = require("./user")
const Team = require("./team")
const Membership = require("./membership")

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.hasMany(Note)
Note.belongsTo(User)

module.exports = {
  Note,
  User,
  Team,
  Membership,
}
