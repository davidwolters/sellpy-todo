import express from "express"

import todoListController from "@controllers/todoLists"
import todoRouter from "@routes/todos"

const todoListsRouter = express.Router()

todoListsRouter.use("/:listID/todos", todoRouter)
todoListsRouter.get("/", todoListController.getAll)
todoListsRouter.post("/", todoListController.create)
todoListsRouter.put("/", todoListController.updateAll)

export default todoListsRouter
