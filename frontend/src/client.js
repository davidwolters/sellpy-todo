import getConfig from "./config/environment"

export const fetchTodoLists = async () => {
  const todoLists = await (
    await fetch(`${getConfig().apiURL}/todoLists`)
  ).json()

  return todoLists.data.map(list => ({ ...list }))
}

export const updateTodoLists = async lists => {
  const newLists = await (
    await fetch(`${getConfig().apiURL}/todoLists`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lists })
    })
  ).json()

  return newLists.data
}

export const addTodo = async (listID, todo) => {
  const newTodo = await (
    await fetch(`${getConfig().apiURL}/todoLists/${listID}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo })
    })
  ).json()

  return newTodo.data
}

export const addList = async name => {
  const newList = await (
    await fetch(`${getConfig().apiURL}/todoLists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
  ).json()

  return newList.data
}
