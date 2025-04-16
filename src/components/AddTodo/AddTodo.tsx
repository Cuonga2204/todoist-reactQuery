import { Input, Button, Flex } from "antd";
import { useState } from "react";
import { useAddTodo } from "../../hooks/useAddTodo";

const AddTodo = () => {
  const [name, setName] = useState<string>("");
  const mutationAddTodo = useAddTodo({ name, setName });

  const handleAddTodo = () => {
    mutationAddTodo.mutate();
  };
  return (
    <Flex>
      <Input
        placeholder="input add todo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        type="primary"
        onClick={handleAddTodo}
        disabled={name.trim() ? false : true}
      >
        Add
      </Button>
    </Flex>
  );
};

export default AddTodo;
