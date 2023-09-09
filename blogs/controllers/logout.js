const router = require("express").Router()
const { ActiveSession } = require("../models")
const { tokenExtractor } = require("../util/middleware")

router.delete("/", tokenExtractor, async (req, res) => {
  try {
    const userId = req.decodedToken.id
    await ActiveSession.destroy({ where: { userId } })
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

module.exports = router
