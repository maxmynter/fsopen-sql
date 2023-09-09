const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = require("express").Router()
const userIsDisabled = require("../util/userIsDisabled")

const { SECRET } = require("../util/config")
const { User, ActiveSession, Disabled } = require("../models")

router.post("/", async (request, response) => {
  const body = request.body
  const user = await User.findOne({
    where: {
      username: body.username,
    },
  })

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    })
  }

  const isDisabled = await userIsDisabled(user.id)
  if (isDisabled) {
    return response
      .status(403)
      .json({ error: "User deactivated. Please contact an administrator." })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await ActiveSession.create({ userId: user.id, token })

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router
