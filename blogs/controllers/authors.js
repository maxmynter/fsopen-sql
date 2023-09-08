const router = require("express").Router()

const { Blog } = require("../models")
const { sequelize } = require("../util/db")

router.get("/", async (req, res) => {
  const blogsByAuthors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: [["likes", "DESC"]],
  })
  res.json(blogsByAuthors)
})

module.exports = router
