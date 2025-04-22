import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo.types";
import authStore from "../store/authStore";
import { updateTodoApi } from "../api/todo.api";

interface UseEditTodo {
  id: string;
  setIsEditing: (isEditing: boolean) => void;
}

export const useEditTodo = ({ id, setIsEditing }: UseEditTodo) => {
  const queryClient = useQueryClient();
  const { userId } = authStore();

  return useMutation({
    mutationFn: (updatedData: Omit<Todo, "id">) =>
      updateTodoApi({ id, ...updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", userId] });
      setIsEditing(false);
    },
  });
};
