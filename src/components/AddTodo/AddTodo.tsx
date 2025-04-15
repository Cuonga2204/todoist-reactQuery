import { Input, Button, Flex } from "antd";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import authStore from "../../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { addTodoByUser } from "../../api/todo.api";
const AddTodo = () => {
  const [name, setName] = useState<string>("");
  const { userId } = authStore();
  const queryClient = useQueryClient();

  const mutationAddTodo = useMutation({
    mutationFn: () =>
      addTodoByUser({ name, completed: false, userId: userId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const handleAddTodo = () => {
    mutationAddTodo.mutate();
    setName("");
  };
  return (
    <Flex>
      <Input
        placeholder="input add todo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="primary" onClick={handleAddTodo}>
        Add
      </Button>
    </Flex>
  );
};

export default AddTodo;
