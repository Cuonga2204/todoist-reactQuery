import { Checkbox, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Todo } from "../../types/todo.types";
import { useState } from "react";
import { EditTodoForm } from "../EditTodoForm/EditTodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../../api/todo.api";
import authStore from "../../store/authStore";

const TodoItem: React.FC<Todo> = ({ name, id, completed }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { userId } = authStore();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", userId] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        id,
        name,
        completed: !completed,
        userId: userId || "",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", userId] });
    },
  });

  return (
    <div className="flex items-center mb-2">
      <Checkbox
        checked={completed}
        style={{ marginRight: 10 }}
        onChange={() => toggleMutation.mutate()}
      />
      {isEditing ? (
        <EditTodoForm
          id={id}
          name={name}
          setIsEditing={setIsEditing}
          completed={completed}
        />
      ) : (
        <>
          <span
            className={`cursor-pointer flex-1 ml-[5px] ${
              completed ? "line-through opacity-50" : ""
            }`}
            onClick={() => toggleMutation.mutate()}
          >
            {name}
          </span>
          <Button
            disabled={completed}
            onClick={() => setIsEditing(true)}
            icon={<EditOutlined />}
            type="link"
          />
        </>
      )}

      <Button
        icon={<DeleteOutlined />}
        onClick={() => deleteMutation.mutate()}
        type="link"
        danger
      />
    </div>
  );
};

export default TodoItem;
