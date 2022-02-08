import { makeStyles } from "@mui/styles"
import Todo from "./Todo"
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Menu,
  MenuItem
} from "@mui/material"
import {
  ADD_TODO,
  DELETE_LIST,
  SET_TODOS,
  UPDATE_QUEUED,
  useTodos
} from "../../context"
import { Box } from "@mui/system"
import { MoreHoriz } from "@mui/icons-material"
import Delete from "@mui/icons-material/Delete"
import { useState } from "react"

const useStyles = makeStyles({
  card: {
    margin: "1rem"
  },
  todoLine: {
    display: "flex",
    margin: "10px 0",
    alignItems: "center"
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: "8px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  }
})

const DeleteListMenu = ({ deleteList }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCloseAndDelete = () => {
    handleClose()
    deleteList()
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <MoreHoriz color="action" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}>
        <MenuItem onClick={handleCloseAndDelete}>
          <Delete color="error" />
          Delete List
        </MenuItem>
      </Menu>
    </div>
  )
}

const Wrapper = ({ todoList, deleteList, classes, children }) => (
  <Card className={classes.card}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Typography component="h2">{todoList.name}</Typography>
        <DeleteListMenu deleteList={deleteList} />
      </Box>
      {children}
    </CardContent>
  </Card>
)

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const classes = useStyles()
  const { dispatch } = useTodos()

  const updateTodo = index => event => {
    dispatch({
      type: SET_TODOS,
      listID: todoList.id,
      todos: [
        ...todoList.todos.slice(0, index),
        {
          ...todoList.todos[index],
          name: event.target.value
        },
        ...todoList.todos.slice(index + 1)
      ]
    })

    dispatch({ type: UPDATE_QUEUED })
  }

  const checkTodo = index => event => {
    dispatch({
      type: SET_TODOS,
      listID: todoList.id,
      todos: [
        ...todoList.todos.slice(0, index),
        {
          ...todoList.todos[index],
          completed: event.target.checked
        },
        ...todoList.todos.slice(index + 1)
      ]
    })

    dispatch({ type: UPDATE_QUEUED })
  }

  const deleteTodo = todoID => () => {
    dispatch({
      type: SET_TODOS,
      listID: todoList.id,
      todos: todoList.todos.filter(todo => todo.id !== todoID)
    })
    dispatch({ type: UPDATE_QUEUED })
  }

  const addTodo = () => {
    dispatch({
      type: ADD_TODO,
      listID: todoList.id,
      todo: {
        name: "",
        completed: false
      }
    })
  }

  const deleteList = () => {
    dispatch({
      type: DELETE_LIST,
      listID: todoList.id
    })
    dispatch({ type: UPDATE_QUEUED })
  }

  return (
    <Wrapper todoList={todoList} classes={classes} deleteList={deleteList}>
      <form className={classes.form}>
        {!todoList.todos.length && (
          <Typography variant="caption">No todos yet, add one!</Typography>
        )}
        {todoList.todos.map((todo, index) => (
          <Todo
            todo={todo}
            key={index}
            index={index}
            classes={classes}
            updateTodo={updateTodo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
          />
        ))}
        <CardActions>
          <Button type="button" color="primary" onClick={addTodo}>
            Add Todo
          </Button>
        </CardActions>
      </form>
    </Wrapper>
  )
}
