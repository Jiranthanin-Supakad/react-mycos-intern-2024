import axios from "axios";
import { ITodo } from "../components/SelfTodolist/SelfTodolist";
const base_url = import.meta.env.VITE_API_URL;
export const todoApi = {
  getTodos: () => axios.get<ITodo[]>(base_url),
  addTodo: (todo: ITodo) => axios.post(base_url, todo),
  updateTodo: (id: string, todo: ITodo) => axios.put(base_url + `/${id}`, todo),
  deleteTodo: (id: string) => axios.delete<ITodo>(base_url + `/${id}`),
  getTodo: (id: string) => axios.get<ITodo>(base_url + `/${id}`),
};
