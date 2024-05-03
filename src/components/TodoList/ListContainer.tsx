import React, { useCallback, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Box, Button, Grid, Typography } from "@mui/material";
import { todoApi } from "../../api/TodoApi";
import AddTodoDialog from "./NewTodoDialog";
import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../../App";
export interface ITodo {
  id?: string;
  title: string;
  description?: string;
  createDate: string;
  updateDate: string;
  dueDate: string;
  // name: string;
  // detail?: string;
  isDone: boolean;
}

const ListContainer = () => {
  // let todos: ITodo[] = [];
  // const todoList = async () => {
  //   todos = (await todoApi.getTodos()).data;
  // };
  // todoList();

  //use for keep the vairable value
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [openAddToDoDialog, setOpenAddToDoDialog] = useState(false);
  const getTodos = useCallback(async () => {
    const result = await todoApi.getTodos();
    setTodos(result.data);
  }, []);
  const navigate = useNavigate();
  // const addItem = useCallback(async () => {
  //   setOpenAddToDoDialog(true);
  // }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <Box px={4}>
        <Grid container justifyContent={"space-between"} spacing={2}>
          <Grid item md={6} xs={12}>
            <Typography variant="h4">Todo List</Typography>
          </Grid>
          <Grid item md={"auto"} xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/todos/new");
              }}
              fullWidth={true}
            >
              + Add List
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction={"column"}>
          {todos.map((t) => {
            return (
              <Grid key={"todo-" + t.title} item pl={2}>
                <TodoItem todoItem={t} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <AddTodoDialog
        open={openAddToDoDialog}
        onClose={() => setOpenAddToDoDialog(false)}
        onSuccess={getTodos}
      />
    </>
  );
};

export default ListContainer;
