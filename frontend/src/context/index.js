import {
  addList,
  addTodo,
  deleteList,
  insertList,
  insertTodo,
  listAdded,
  setTodoLists,
  setTodoListTodos,
  todoAdded,
  updateProgressUpdated,
  updateStarted
} from "./handlers"

import { createContext, useReducer, useContext } from "react"

const initialState = {
  lists: [],
  updated: false,
  saving: false,
  newTodo: undefined,
  newList: undefined
}

const TodosContext = createContext(initialState)

// Dispatch actions
export const SET_TODOS = "setTodos"
export const ADD_TODO = "addTodo"
export const SET_TODO_LISTS = "setTodoLists"
export const UPDATE_QUEUED = "updatedQueued"
export const UPDATE_COMPLETED = "updateSaved"
export const UPDATE_STARTED = "updateStarted"
export const TODO_ADDED = "todoAdded"
export const INSERT_TODO = "insertTodo"
export const ADD_LIST = "addList"
export const LIST_ADDED = "listAdded"
export const INSERT_LIST = "insertList"
export const DELETE_LIST = "deleteList"

const todosReducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return setTodoListTodos(state, action.listID, action.todos)
    case ADD_TODO:
      return addTodo(state, action.todo, action.listID)
    case TODO_ADDED:
      return todoAdded(state)
    case INSERT_TODO:
      return insertTodo(state, action.listID, action.todo)
    case ADD_LIST:
      return addList(state, action.name)
    case LIST_ADDED:
      return listAdded(state)
    case INSERT_LIST:
      return insertList(state, action.list)
    case SET_TODO_LISTS:
      return setTodoLists(state, action.lists)
    case UPDATE_QUEUED:
    case UPDATE_COMPLETED:
      return updateProgressUpdated(state, action.type)
    case UPDATE_STARTED:
      return updateStarted(state)
    case DELETE_LIST:
      return deleteList(state, action.listID)
    default:
      throw new Error(`UNHANDLED ACTION TYPE: ${action.type}`)
  }
}

export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState)
  const value = { state, dispatch }
  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}

export const useTodos = () => {
  const context = useContext(TodosContext)

  if (context === undefined) {
    throw new Error("No provider found")
  }
  return context
}
