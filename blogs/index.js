const express = require("express")
const app = express()

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db")
const blogsRouter = require("./controllers/blog")

app.use(express.json())

app.use("/api/blogs", blogsRouter)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
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
