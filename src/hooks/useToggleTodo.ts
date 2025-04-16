import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoApi } from "../api/todo.api";
import authStore from "../store/authStore";
import { Todo } from "../types/todo.types";

export const useToggleTodo = (todo: Todo) => {
  const queryClient = useQueryClient();
  const { userId } = authStore();
  return useMutation({
    mutationFn: () => updateTodoApi({ ...todo, completed: !todo.completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", userId] });
    },
  });
};
