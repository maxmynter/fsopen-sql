const { SECRET } = require("./config")
const jwt = require("jsonwebtoken")

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

module.exports = { tokenExtractor }
