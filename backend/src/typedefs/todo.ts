export type Todo = {
  name: string
  completed: boolean
}

export type PersistedTodo = Todo & {
  id: number
}

export type MaybePersistedTodo = Todo & {
  id?: number
}

export type TodoListHeader = {
  name: string
}

export type TodoList = TodoListHeader & {
  todos: Todo[]
}

export type PersistedTodoListHeader = TodoListHeader & {
  id: number
}

export type PersistedTodoList = PersistedTodoListHeader & {
  todos: PersistedTodo[]
}

export type TodoListStore = {
  todoLists: PersistedTodoList[]
  maxTodoListID: number
  maxTodoID: number
}
