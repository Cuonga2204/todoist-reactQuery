import { Typography, Divider, Layout, Card } from "antd";
import FilterTodo from "../components/FilterTodo/FilterTodo";
import AddTodo from "../components/AddTodo/AddTodo";
import TodoList from "../components/TodoList/TodoList";
import SearchTodo from "../components/SearchTodo/SearchTodo";
import authStore from "../store/authStore";
const { Title } = Typography;
const { Content } = Layout;

export const Todo = () => {
  const { user } = authStore();
  return (
    <>
      <Card className="w-[400px] h-[84vh] min-80 bg-white p-3.5 mx-auto mt-6">
        <Content>
          <Title level={1} className="text-center">
            TodoList
          </Title>
          <Title level={5}>Name :{user}</Title>
          <SearchTodo />
          <FilterTodo />
          <Divider />
          <TodoList />
          <Divider />
          <AddTodo />
        </Content>
      </Card>
    </>
  );
};
