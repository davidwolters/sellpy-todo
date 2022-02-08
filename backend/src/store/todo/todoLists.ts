import {
  PersistedTodoList,
  PersistedTodoListHeader,
  TodoListHeader,
  PersistedTodo
} from "@typedefs/todo"

import { store } from "@store/todo"

export const getAllTodoLists = (): PersistedTodoList[] => store.todoLists

export const getTodoListIndex = (id: number) =>
  store.todoLists.findIndex(list => list.id === id)

export const createTodoList = (list: TodoListHeader): PersistedTodoList => {
  const persistedList: PersistedTodoList = {
    ...list,
    id: store.maxTodoListID++,
    todos: []
  }

  store.todoLists.push(persistedList)

  return persistedList
}

export const updateTodoLists = (lists: PersistedTodoList[]) => {
  // Add IDs to any lists or Todos that don't already have them.

  const getTodoWithID = (todo: PersistedTodo) => ({
    ...todo,
    id: todo.id === -1 ? store.maxTodoID++ : todo.id
  })

  const getListWithID = (list: PersistedTodoList) => ({
    ...list,
    id: list.id === -1 ? store.maxTodoListID++ : list.id,
    todos: list.todos.map(getTodoWithID)
  })

  const persistedLists = lists.map(getListWithID)

  store.todoLists = persistedLists

  return lists
}

export const getTodoList = (id: number): PersistedTodoList => {
  return store.todoLists.find(list => list.id === id)
}

export const deleteTodoList = (id: number) => {
  const listIndex = getTodoListIndex(id)

  if (listIndex === -1) {
    throw `Could not find todo list with ID ${id}`
  }
  store.todoLists.splice(listIndex, 1)
}

export default {
  getAllTodoLists,
  createTodoList,
  getTodoList,
  updateTodoLists,
  deleteTodoList
}
