import { Button, Grid, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../../api/TodoApi";
import { ITodo } from "./ListContainer";

const UpsertTodoItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<ITodo | undefined>();

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  // const [todoCreateDate, setTodoCreateDate] = useState("");
  // const [todoUpdateDate, setTodoUpdateDate] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("");

  const onSave = async () => {
    if (!todo?.id && !todo) {
      await todoApi.addTodo({
        title: todoTitle,
        // isDone: false,
        description: todoDescription,
        dueDate: todoDueDate
      });
    } else {
      await todoApi.updateTodo(todo.id!, {
        ...todo,
        description: todoDescription,
        title: todoTitle,
      });
    }
    navigate("/todos");
  };
  const loadTodo = useCallback(async (id: string) => {
    const res = await todoApi.getTodo(id);
    setTodo(res.data);
    setTodoTitle(res.data.title ?? "");
    setTodoDescription("");
  }, []);

  useEffect(() => {
    if (id) {
      loadTodo(id);
    }
  }, [id, loadTodo]);

  return (
    <div>
      <Grid container spacing={1} direction={"column"}>
        <Grid item>
          <TextField
            label="Title"
            variant="outlined"
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Description"
            variant="outlined"
            value={todoDescription}
            onChange={(e) => {
              setTodoDescription(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent={"end"} pt={3}>
        <Grid item>
          <Button onClick={onSave}>Save</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => navigate("/todos")} color="secondary">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpsertTodoItem;