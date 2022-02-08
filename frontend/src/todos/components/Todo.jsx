import { Button, Checkbox, TextField, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

const Todo = ({ todo, index, classes, updateTodo, checkTodo, deleteTodo }) => (
  <div key={index} className={classes.todoLine}>
    <Typography className={classes.standardSpace} variant="h6">
      {index + 1}
    </Typography>
    <Checkbox onChange={checkTodo(index)} checked={todo.completed} />
    <TextField
      label="What to do?"
      value={todo.name}
      className={classes.textField}
      onChange={updateTodo(index)}
    />
    <Button
      size="large"
      color="secondary"
      className={classes.standardSpace}
      onClick={deleteTodo(todo.id)}>
      <DeleteIcon />
    </Button>
  </div>
)

export default Todo
