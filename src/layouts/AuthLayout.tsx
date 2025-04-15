import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content } = Layout;

export const AuthLayout = () => {
  const menuItems = [
    {
      key: "homePage",
      label: <Link to="/">HomePage</Link>,
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["homePage"]}
          items={menuItems}
          style={{ marginLeft: "auto" }}
        />
      </Header>
      <Content style={{ padding: "24px", minHeight: "100vh" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};
