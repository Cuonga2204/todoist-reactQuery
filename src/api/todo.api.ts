import axios from "axios";
import { Todo } from "../types/todo.types";
import { API_URL } from "../constants/config";

export const getTodosByUserId = async (userId: string) => {
  const res = await axios.get(`${API_URL}/todos?userId=${userId}`);
  return res.data;
};

export const addTodoByUser = async (todo: Omit<Todo, "id">) => {
  const res = await axios.post(`${API_URL}/todos`, todo);
  return res.data;
};

export const updateTodo = async (todo: Todo) => {
  const res = await axios.put(`${API_URL}/todos/${todo.id}`, todo);
  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await axios.delete(`${API_URL}/todos/${id}`);
  return res.data;
};
