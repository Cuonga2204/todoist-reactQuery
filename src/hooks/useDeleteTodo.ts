import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoApi } from "../api/todo.api";
import { Todo } from "../types/todo.types";

export const useDeleteTodo = (todo: Todo) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTodoApi(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", todo.userId] });
    },
  });
};
