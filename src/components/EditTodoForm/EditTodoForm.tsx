import React, { useState } from "react";
import { Input, Button } from "antd";
import authStore from "../../store/authStore";
import { useEditTodo } from "../../hooks/useEditTodo";

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
  const { userId } = authStore();

  const editMutation = useEditTodo({ id, setIsEditing });

  const handleSave = () => {
    if (!editName.trim() || !userId) return;
    editMutation.mutate({ name: editName.trim(), completed, userId });
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
        loading={editMutation.isPending}
        disabled={!editName.trim()}
      >
        Save
      </Button>
    </>
  );
};
