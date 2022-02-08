import express from "express"

import todoController from "@controllers/todos"

const todoRouter = express.Router({ mergeParams: true })
todoRouter.post("/", todoController.create)

export default todoRouter
