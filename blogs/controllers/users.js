const router = require("express").Router()
const bcrypt = require("bcrypt")

const { User, Blog } = require("../models")

router.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ username, name, passwordHash })
    res.json(user)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: { model: Blog },
      attribute: { exclude: ["userId"] },
    })
    res.json(users)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.put("/:username", async (req, res) => {
  const user = await User.findByPk({ username: req.params.username })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
