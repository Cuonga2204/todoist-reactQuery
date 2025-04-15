import React, { useState } from "react";
import { Input, Button } from "antd";
import { Todo } from "../../types/todo.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo as updateTodoApi } from "../../api/todo.api";
import authStore from "../../store/authStore";

interface EditTodoFormProps {
  id: string;
  name: string;
  completed: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({
  id,
  name,
  completed,
  setIsEditing,
}) => {
  const [editName, setEditName] = useState<string>(name);
  const queryClient = useQueryClient();
  const { userId } = authStore();

  const { mutate: updateTodo, isPending } = useMutation({
    mutationFn: (updatedData: Omit<Todo, "id">) =>
      updateTodoApi({ id, ...updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", userId] });
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    if (!editName.trim() || !userId) return;
    updateTodo({ name: editName.trim(), completed, userId });
  };

  return (
    <>
      <Input
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="mr-1.5"
      />
      <Button
        onClick={handleSave}
        type="primary"
        loading={isPending}
        disabled={!editName.trim()}
      >
        Save
      </Button>
    </>
  );
};
