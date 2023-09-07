const router = require("express").Router()
const jwt = require("jsonwebtoken")

const { SECRET } = require("../util/config")
const { Blog, User } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (err) {
      console.log(err)
      return res.status(401).json({ error: "Invalid Token" })
    }
  } else {
    return res.status(401).json({ error: "token missing" })
  }
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: { model: User, attributes: ["name"] },
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
