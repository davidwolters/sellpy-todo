import { UPDATE_COMPLETED, UPDATE_QUEUED } from "."

export const setTodoListTodos = (state, listID, todos) => {
  const index = state.lists.findIndex(list => list.id === listID)

  return {
    ...state,
    lists: [
      ...state.lists.slice(0, index),
      {
        id: state.lists[index].id,
        name: state.lists[index].name,
        todos
      },
      ...state.lists.slice(index + 1)
    ]
  }
}

export const addTodo = (state, todo, listID) => ({
  ...state,
  newTodo: { todo, listID }
})

export const todoAdded = state => ({
  ...state,
  newTodo: undefined
})

export const insertTodo = (state, listID, todo) => {
  const index = state.lists.findIndex(list => list.id === listID)

  return {
    ...state,
    newTodo: { todo, listID },
    lists: [
      ...state.lists.slice(0, index),
      {
        id: state.lists[index].id,
        name: state.lists[index].name,
        todos: [...state.lists[index].todos, todo]
      },
      ...state.lists.slice(index + 1)
    ]
  }
}

export const updateStarted = state => ({
  ...state,
  saving: true
})

export const updateProgressUpdated = (state, type) => ({
  ...state,
  updated: type === UPDATE_QUEUED,
  saving: type === UPDATE_COMPLETED ? false : state.saving
})

export const addList = (state, name) => ({
  ...state,
  newList: name
})

export const listAdded = state => ({
  ...state,
  newList: undefined
})

export const insertList = (state, list) => ({
  ...state,
  lists: [...state.lists, list]
})

export const setTodoLists = (state, lists) => ({
  ...state,
  lists
})

export const deleteList = (state, listID) => {
  const index = state.lists.findIndex(list => list.id === listID)

  return {
    ...state,
    lists: [...state.lists.slice(0, index), ...state.lists.slice(index + 1)]
  }
}
