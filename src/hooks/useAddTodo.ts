import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodoApi } from "../api/todo.api";
import authStore from "../store/authStore";

interface UseAddTodoProps {
  name: string;
  setName: (name: string) => void;
}

export const useAddTodo = ({ name, setName }: UseAddTodoProps) => {
  const { userId } = authStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addTodoApi({ name, completed: false, userId: userId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setName("");
    },
  });
};
