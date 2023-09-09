const Blog = require("./blog")
const User = require("./user")
const ReadingList = require("./reading_list")

User.belongsToMany(Blog, { through: ReadingList })
Blog.belongsToMany(User, { through: ReadingList })

User.hasMany(Blog)
Blog.belongsTo(User)

module.exports = {
  Blog,
  User,
  ReadingList,
}
