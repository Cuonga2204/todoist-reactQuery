import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Todo } from "./pages/Todo";
import { Signup } from "./pages/Signup";
import { AuthLayout } from "./layouts/AuthLayout";
import { TodoLayout } from "./layouts/TodoLayout";
import { TableForm } from "./pages/TableForm";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<TodoLayout />}>
            <Route path="/" element={<Todo />} />
            <Route path="/table" element={<TableForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
