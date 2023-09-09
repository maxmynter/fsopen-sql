const router = require("express").Router()
const { read } = require("fs")
const { Blog, User } = require("../models")
const ReadingList = require("../models/reading_list")
const { tokenExtractor } = require("../util/middleware")

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

router.put("/:id", tokenExtractor, async (req, res) => {
  const userId = req.decodedToken.id
  const readingList = await ReadingList.findByPk(req.params.id)
  if (userId === readingList.userId) {
    readingList.read = req.body.read
    await readingList.save()
    res.json(readingList)
  } else {
    res.status(404).end()
  }
})

module.exports = router
