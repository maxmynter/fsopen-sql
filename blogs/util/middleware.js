const { SECRET } = require("./config")
const jwt = require("jsonwebtoken")
const ActiveSession = require("../models/activeSession")
const userIsDisabled = require("./userIsDisabled")

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

      const isDisabled = await userIsDisabled(req.decodedToken.id)

      if (isDisabled) {
        return res
          .status(401)
          .json("Error. User is disabled. Please contact the administrator")
      }

      const session = await ActiveSession.findOne({
        userId: req.decodedToken.id,
      })
      if (!session) {
        return res
          .status(401)
          .json({ error: "Expired token. Please log in again." })
      }
    } catch (err) {
      return res.status(401).json({ error: "Invalid Token" })
    }
  } else {
    return res.status(401).json({ error: "token missing" })
  }
  next()
}

module.exports = { tokenExtractor }
