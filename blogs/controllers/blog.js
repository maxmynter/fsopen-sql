const router = require("express").Router()

const { Blog } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (err) {
    res.status(400).json({ err })
    next(err)
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  Blog.destroy({ where: { id } })
  return res.status(204).send()
})

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog.likes)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
