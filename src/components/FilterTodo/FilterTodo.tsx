import { Radio } from "antd";
import { useTodoStore } from "../../store/todoStore";

const FilterTodo = () => {
  const { filter, setFilter } = useTodoStore();
  return (
    <div className="flex flex-col mt-4 gap-3">
      <strong>Filter by status</strong>
      <Radio.Group
        block
        value={filter}
        className="mt-2 flex justify-between"
        onChange={(e) => setFilter(e.target.value)}
      >
        <Radio value="All">All</Radio>
        <Radio value="Completed">Completed</Radio>
        <Radio value="Todo">To do</Radio>
      </Radio.Group>
    </div>
  );
};

export default FilterTodo;
