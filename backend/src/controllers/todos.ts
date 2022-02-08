import { Response, Request, NextFunction } from "express"
import { todos } from "@store/todo"
import { sendSuccess } from "@utils/response"

const createTodo = (req: Request, res: Response, next: NextFunction) => {
  const { listID } = req.params
  const { name } = req.body
  const persistedTodo = todos.createTodo(+listID, {
    name,
    completed: false
  })
  sendSuccess(res, persistedTodo)
}

export default {
  create: createTodo
}
