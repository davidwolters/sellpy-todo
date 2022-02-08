import { MaybePersistedTodo, PersistedTodo, Todo } from "src/typedefs/todo"

import { todoLists, store } from "@store/todo"
import { getTodoListIndex } from "./todoLists"

const getTodoIndex = (listID: number, todoID: number) => {
  const listIndex = getTodoListIndex(listID)
  return {
    listIndex,
    todoIndex: store.todoLists[listIndex].todos.findIndex(
      todo => todo.id === todoID
    )
  }
}

export const getAllTodos = (listID: number): PersistedTodo[] =>
  todoLists.getTodoList(listID).todos

export const setAllTodos = (
  listID: number,
  todos: MaybePersistedTodo[]
): PersistedTodo[] => {
  const listIndex = getTodoListIndex(listID)

  if (listIndex === -1) {
    throw `Could not find todo list with id ${listID}`
  }

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i]
    if (todo.id) {
      const id = todo.id!
      updateTodo(listID, {
        ...todo,
        id
      })
    } else {
      createTodo(listID, todo)
    }
  }

  return getAllTodos(listID)
}

export const createTodo = (listID: number, todo: Todo): PersistedTodo => {
  const list = todoLists.getTodoList(listID)

  const persistedTodo = {
    ...todo,
    id: store.maxTodoID++
  }

  list.todos.push(persistedTodo)
  return persistedTodo
}

export const getTodo = (listID: number, todoID: number): PersistedTodo => {
  const list = todoLists.getTodoList(listID)

  return list.todos.find(todo => todo.id === todoID)
}

export const updateTodo = (
  listID: number,
  todo: PersistedTodo
): PersistedTodo => {
  const { listIndex, todoIndex } = getTodoIndex(listID, todo.id)

  if (listIndex === -1 || todoIndex === -1) {
    throw `Could not find Todo in list ${listID} with ID ${todo.id}`
  }

  store.todoLists[listIndex].todos[todoIndex] = {
    ...store.todoLists[listIndex].todos[todoIndex],
    ...todo
  }

  return store.todoLists[listIndex].todos[todoIndex]
}

export const deleteTodo = (listID: number, todoID: number): PersistedTodo[] => {
  const { listIndex, todoIndex } = getTodoIndex(listID, todoID)
  if (listIndex === -1 || todoIndex === -1) {
    throw `Could not find Todo in list ${listID} with ID ${todoID}`
  }

  store.todoLists[listIndex].todos.splice(todoIndex, 1)

  return store.todoLists[listIndex].todos
}

export default {
  getAllTodos,
  setAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
}
