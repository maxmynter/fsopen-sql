const router = require("express").Router()
const ReadingList = require("../models/reading_list")

router.get("/", () => {})

router.post("/", async (req, res) => {
  try {
    const readingList = await ReadingList.create(req.body)
    res.json(readingList)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

module.exports = router
