const router = require("express").Router()
const { Op } = require("sequelize")
const { tokenExtractor } = require("../util/middleware")

const { Blog, User } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  let where = {}
  if (req.query.search) {
    where = {
      ...where,
      [Op.or]: [
        { title: { [Op.substring]: req.query.search } },
        { author: { [Op.substring]: req.query.search } },
      ],
    }
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: { model: User, attributes: ["name"] },
    where,
    order: [["likes", "DESC"]],
  })
  res.json(blogs)
})

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    })
    return res.json(blog)
  } catch (err) {
    res.status(400).json({ err })
    next(err)
  }
})

router.delete("/:id", [tokenExtractor, blogFinder], async (req, res) => {
  const blogId = req.params.id
  const blogToBeDeleted = await Blog.findByPk(blogId)
  const user = await User.findByPk(req.decodedToken.id)
  if (user.id === blogToBeDeleted.userId) {
    Blog.destroy({ where: { id: blogId } })
    return res.status(204).send()
  } else {
    res.status(403).send()
  }
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
