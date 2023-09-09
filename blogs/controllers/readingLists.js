const router = require("express").Router()
const { Blog, User } = require("../models")
const ReadingList = require("../models/reading_list")

router.get("/", async (req, res) => {
  const readingLists = await ReadingList.findAll({
    include: [
      {
        model: Blog,
        attribute: { include: ["author", "title", "year"] },
      },
      { model: User, attribute: { include: ["name", "username"] } },
    ],
  })
  res.json(readingLists)
})

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
