const Blog = require("./blog")
const User = require("./user")
const ReadingList = require("./reading_list")

User.belongsToMany(Blog, { through: ReadingList, as: "readings" })
Blog.belongsToMany(User, { through: ReadingList, as: "on_read_list" })

User.hasMany(Blog)
Blog.belongsTo(User)

ReadingList.belongsTo(Blog)
ReadingList.belongsTo(User)
User.hasMany(ReadingList)
Blog.hasMany(ReadingList)

module.exports = {
  Blog,
  User,
  ReadingList,
}
