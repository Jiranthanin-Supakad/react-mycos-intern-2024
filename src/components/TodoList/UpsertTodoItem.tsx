import { Button, Grid, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../../api/TodoApi";
import { ITodo } from "./ListContainer";

const UpsertTodoItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<ITodo | undefined>();

  const [todoName, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoCreateDate, setTodoCreateDate] = useState("");
  const [todoUpdateDate, setTodoUpdateDate] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("");

  const onSave = async () => {
    if (!todo?.id && !todo) {
      await todoApi.addTodo({
        title: todoName,
        // isDone: false,
        description: todoDetail,
        createDate: todoCreateDate,
        updateDate: todoUpdateDate,
        dueDate: todoDueDate
      });
    } else {
      await todoApi.updateTodo(todo.id!, {
        ...todo,
        description: todoDetail,
        title: todoName,
      });
    }
    navigate("/todos");
  };
  const loadTodo = useCallback(async (id: string) => {
    const res = await todoApi.getTodo(id);
    setTodo(res.data);
    setTodoTitle(res.data.title ?? "");
    setTodoDetail("");
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
            label="Name"
            variant="outlined"
            value={todoName}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Detail"
            variant="outlined"
            value={todoDetail}
            onChange={(e) => {
              setTodoDetail(e.target.value);
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
