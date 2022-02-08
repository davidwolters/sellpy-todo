import { useEffect, useRef, useState } from "react"
import { addList, addTodo, fetchTodoLists, updateTodoLists } from "../../client"
import {
  INSERT_LIST,
  INSERT_TODO,
  LIST_ADDED,
  SET_TODO_LISTS,
  TODO_ADDED,
  UPDATE_COMPLETED,
  UPDATE_STARTED
} from "../../context"

export const useTodoLists = dispatch => {
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const fetchFunction = async () => {
      const lists = await fetchTodoLists()
      setCompleted(true)
      dispatch({
        type: SET_TODO_LISTS,
        lists
      })
    }

    fetchFunction()
  }, [])

  return completed
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export const useAutoSave = (state, dispatch, delay) => {
  useInterval(async () => {
    if (state.updated) {
      saveLists(state, dispatch)
    } else if (state.newTodo !== undefined) {
      saveNewTodo(state, dispatch)
    } else if (state.newList !== undefined) {
      saveNewList(state, dispatch)
    }
  }, delay)
}

const saveLists = async (state, dispatch) => {
  dispatch({ type: UPDATE_STARTED })
  await updateTodoLists(state.lists)
  dispatch({ type: UPDATE_COMPLETED })
}

const saveNewTodo = async (state, dispatch) => {
  dispatch({ type: UPDATE_STARTED })
  const todo = await addTodo(state.newTodo.listID, state.newTodo.todo)
  dispatch({ type: INSERT_TODO, listID: state.newTodo.listID, todo })
  dispatch({ type: TODO_ADDED })
  dispatch({ type: UPDATE_COMPLETED })
}

const saveNewList = async (state, dispatch) => {
  dispatch({ type: UPDATE_STARTED })
  const list = await addList(state.newList)
  dispatch({ type: INSERT_LIST, list })
  dispatch({ type: LIST_ADDED })
  dispatch({ type: UPDATE_COMPLETED })
}
