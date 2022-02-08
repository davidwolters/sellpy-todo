import { NextFunction, Request, Response } from "express"
import { todoLists } from "@store/todo"
import { sendSuccess } from "@utils/response"

const getAllTodoLists = (req: Request, res: Response, next: NextFunction) => {
  sendSuccess(
    res,
    todoLists.getAllTodoLists().map(list => ({
      name: list.name,
      id: list.id,
      todos: list.todos,
      todosCount: list.todos.length,
      completedCount: list.todos.filter(todo => todo.completed).length
    }))
  )
}

const createTodoList = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body
  const todoList = todoLists.createTodoList({ name })
  sendSuccess(res, todoList)
}

const updateTodoLists = (req: Request, res: Response, next: NextFunction) => {
  const { lists } = req.body

  todoLists.updateTodoLists(lists)

  sendSuccess(res, lists)
}

export default {
  getAll: getAllTodoLists,
  create: createTodoList,
  updateAll: updateTodoLists
}
