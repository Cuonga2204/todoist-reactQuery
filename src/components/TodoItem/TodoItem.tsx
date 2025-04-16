import { Checkbox, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Todo } from "../../types/todo.types";
import { useState } from "react";
import { EditTodoForm } from "../EditTodoForm/EditTodoForm";
import { useToggleTodo } from "../../hooks/useToggleTodo";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";

const TodoItem: React.FC<Todo> = (todo) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const deleteMutation = useDeleteTodo(todo);

  const toggleMutation = useToggleTodo(todo);

  return (
    <div className="flex items-center mb-2">
      <Checkbox
        checked={todo.completed}
        style={{ marginRight: 10 }}
        onChange={() => toggleMutation.mutate()}
      />
      {isEditing ? (
        <EditTodoForm
          id={todo.id}
          name={todo.name}
          setIsEditing={setIsEditing}
          completed={todo.completed}
        />
      ) : (
        <>
          <span
            className={`cursor-pointer flex-1 ml-[5px] ${
              todo.completed ? "line-through opacity-50" : ""
            }`}
            onClick={() => toggleMutation.mutate()}
          >
            {todo.name}
          </span>
          <Button
            disabled={todo.completed}
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
