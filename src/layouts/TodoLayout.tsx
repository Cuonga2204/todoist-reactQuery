import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import authStore from "../store/authStore";

export const TodoLayout = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  const { logout } = authStore();

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === "logout") {
      logout();
      navigate("/login");
    }
  };

  const menuItems = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "table",
      label: <Link to="/table">Table</Link>,
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  return (
    <>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ marginLeft: "auto" }}
        />
      </Header>
      <Outlet />
    </>
  );
};
