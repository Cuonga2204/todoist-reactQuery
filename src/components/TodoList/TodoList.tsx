import TodoItem from "../TodoItem/TodoItem";
import { useTodoStore } from "../../store/todoStore";
import { FILTER_STATUSES } from "../../constants/filterConstant";
import authStore from "../../store/authStore";
import { Todo } from "../../types/todo.types";
import { useGetListTodo } from "../../hooks/useGetListTodo";

const TodoList = () => {
  const { filter, search } = useTodoStore();
  const { userId } = authStore();

  const { data: todos = [] } = useGetListTodo();
  if (!userId) return null;

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchStatus =
      filter === FILTER_STATUSES.ALL ||
      (filter === FILTER_STATUSES.COMPLETED && todo.completed) ||
      (filter === FILTER_STATUSES.TODO && !todo.completed);
    const matchSearch = todo.name.toLowerCase().includes(search.toLowerCase());
    const matchUser = todo.userId === userId;

    return matchStatus && matchSearch && matchUser;
  });

  return (
    <div className="h-47 overflow-auto">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          name={todo.name}
          id={todo.id}
          completed={todo.completed}
          userId={todo.userId}
        />
      ))}
    </div>
  );
};

export default TodoList;
