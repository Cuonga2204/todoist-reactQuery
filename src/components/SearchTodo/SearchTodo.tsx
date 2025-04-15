import { Input } from "antd";
import { useTodoStore } from "../../store/todoStore";
const SearchTodo = () => {
  const { setSearch } = useTodoStore();
  return (
    <div className="flex flex-col gap-2.5">
      <strong>Search</strong>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="input search text"
      />
    </div>
  );
};

export default SearchTodo;
