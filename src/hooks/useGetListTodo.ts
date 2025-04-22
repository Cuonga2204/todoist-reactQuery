import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTodosByUserIdApi } from "../api/todo.api";
import authStore from "../store/authStore";

export const useGetListTodo = () => {
  const { userId } = authStore();
  return useQuery({
    queryFn: () => getTodosByUserIdApi(userId!),
    placeholderData: keepPreviousData,
    queryKey: ["todos", userId],
    enabled: !!userId,
  });
};
