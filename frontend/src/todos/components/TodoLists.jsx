import React, { Fragment, useState } from "react"
import { TodoListForm } from "./TodoListForm"
import { useAutoSave, useTodoLists } from "../hooks/todoHooks"
import {
  Card,
  CardContent,
  ListItem,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  CardActions,
  Button,
  TextField
} from "@mui/material"

import ReceiptIcon from "@mui/icons-material/Receipt"
import { ADD_LIST, useTodos } from "../../context"
import { Check, Delete } from "@mui/icons-material"
import { useRef } from "react"
import { Box } from "@mui/system"

const ListSelector = ({ children, style }) => (
  <Card style={style}>
    <CardContent>
      <Typography component="h2">My Todo Lists</Typography>
      {children}
    </CardContent>
  </Card>
)

const TodoListItem = ({ list, setActiveList }) => {
  const completed = list.todos.filter(todo => todo.completed).length
  const allChecked = list.todos.length > 0 && completed === list.todos.length

  const sx = allChecked ? { color: "#aaa" } : {}

  const icon = allChecked ? (
    <Check backgroundColor="primary" color="success" />
  ) : (
    <ReceiptIcon />
  )

  return (
    <ListItem key={list.id} button onClick={() => setActiveList(list.id)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={list.name + ` (${completed}/${list.todos.length})`}
        sx={sx}
      />
    </ListItem>
  )
}

const TodoListsList = ({ todoLists, setActiveList, createListForm }) => {
  return (
    <List>
      {todoLists.map(list => (
        <TodoListItem list={list} setActiveList={setActiveList} />
      ))}
      {createListForm}
    </List>
  )
}

const CreateListForm = ({ onDelete, onAdd }) => {
  const input = useRef()

  return (
    <ListItem key={-1}>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText
        disableTypography
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexGrow: "1",
          width: "100%",
          alignSelf: "stretch"
        }}>
        <TextField inputRef={input} label="Add a list" sx={{ flexGrow: 1 }} />
        <Button color="primary" onClick={() => onAdd(input.current.value)}>
          Add
        </Button>
        <Button color="primary" onClick={onDelete}>
          <Delete color="error" />
        </Button>
      </ListItemText>
    </ListItem>
  )
}

export const TodoLists = ({ style }) => {
  const [activeList, setActiveList] = useState(false)
  const [showCreateListForm, setShowCreateListForm] = useState(false)

  const { state, dispatch } = useTodos()
  const { lists } = state
  const completed = useTodoLists(dispatch)

  useAutoSave(state, dispatch, 1000)

  let content = (
    <div style={{ textAlign: "center" }}>
      <CircularProgress />
    </div>
  )

  const onAddList = () => {
    setShowCreateListForm(true)
  }

  const onListAddConfirm = name => {
    console.log("ADDING LIST")
    setShowCreateListForm(false)
    dispatch({
      type: ADD_LIST,
      name
    })
  }

  const createListForm = showCreateListForm && (
    <CreateListForm
      onDelete={() => setShowCreateListForm(false)}
      onAdd={onListAddConfirm}
    />
  )

  if (completed) {
    content = (
      <>
        <TodoListsList
          todoLists={lists}
          setActiveList={setActiveList}
          createListForm={createListForm}
        />
        {!lists.length && !showCreateListForm && (
          <Typography variant="caption">No lists yet, create one!</Typography>
        )}
        <CardActions>
          {!showCreateListForm && (
            <Button type="button" color="primary" onClick={onAddList}>
              Add List
            </Button>
          )}
        </CardActions>
      </>
    )
  }

  const currentSelectedList =
    activeList !== false && lists.find(list => list.id === activeList)

  return (
    <Fragment>
      <ListSelector style={style}>{content}</ListSelector>
      {currentSelectedList && completed && (
        <TodoListForm key={activeList} todoList={currentSelectedList} />
      )}
      {state.saving && (
        <Box sx={{ position: "fixed", bottom: "0", right: "0" }}>
          <CircularProgress />
        </Box>
      )}
    </Fragment>
  )
}
