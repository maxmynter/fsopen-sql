const router = require("express").Router()

const { Blog } = require("../models")

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (err) {
    return res.status(400).json({ err })
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  Blog.destroy({ where: { id } })
  return res.status(204).send()
})

module.exports = router