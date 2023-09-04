require("dotenv").config()
const { Sequelize, Model, DataTypes } = require("sequelize")

const express = require("express")
bodyParser = require("body-parser").urlencoded({ extended: true })
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const sequelize = new Sequelize(process.env.DATABASE_URL, {})

class Blog extends Model {}
Blog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.TEXT },
    url: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" }
)
Blog.sync()

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (err) {
    return res.status(400).json({ err })
  }
})

app.delete("/api/blogs/:id", async (req, res) => {
  const id = req.params.id
  Blog.destroy({ where: { id } })
  return res.status(204).send()
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
