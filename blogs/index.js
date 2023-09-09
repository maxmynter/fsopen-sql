const express = require("express")
const app = express()

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const authorsRouter = require("./controllers/authors")
const readingListRouter = require("./controllers/readingLists")
const logoutRouter = require("./controllers/logout")

app.use(express.json())

app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/authors", authorsRouter)
app.use("/api/readinglists", readingListRouter)
app.use("/api/logout", logoutRouter)

const errorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeValidationError") {
    res.status(400).send({ error: error.errors.map((err) => err.message) })
  } else {
    console.log("ERROR:", error.message)
  }
  next(error)
}
app.use(errorHandler)

const startApp = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server is running. Port: ${PORT}`)
  })
}

startApp()
