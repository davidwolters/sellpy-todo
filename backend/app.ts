import "dotenv/config"
import express from "express"
import config, { loadEnvironmentConfig } from "@config/environment"
import cors from "cors"
import todoListsRouter from "@routes/todoLists"

const app = express()

const start = async () => {
  try {
    // This forcibly loads variables from .env, to make sure everything is in place.
    loadEnvironmentConfig(process.env)

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/todoLists", todoListsRouter)

    await app.listen(config().port)
    console.log(`🚀  Server running on port ${config().port}`)
  } catch (err) {
    console.log("😵 Server unable to start")
    console.log(err)
  }
}

start()
