import React, { useCallback, useState } from "react";
import { ITodo } from "./ListContainer";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import { Link, useNavigate } from "react-router-dom";
interface ITodoItemProps {
  todoItem: ITodo;
}
const TodoItem = (props: ITodoItemProps) => {
  const { todoItem } = props;
  const [innerTodo, setInnerTodo] = useState<ITodo>(todoItem);
  const onChange = useCallback(
    async (value: boolean) => {
      const newTodo: ITodo = { ...innerTodo, isDone: value };
      if (newTodo.id) await todoApi.updateTodo(newTodo.id, newTodo);
      setInnerTodo(newTodo);
    },
    [innerTodo]
  );
  const navigate = useNavigate();
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              onChange(e.target.checked);
            }}
            checked={innerTodo.isDone}
          />
        }
        label={innerTodo.title}
      />
      <Button onClick={() => navigate("/todos/" + todoItem.id)}>Open</Button>
      {/* <Link to={"/todos/" + todoItem.id}>Open</Link> */}
    </>
  );
};

export default TodoItem;
