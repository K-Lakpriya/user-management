import { useEffect, useState } from "react";
import { Image, Menu } from "antd";
import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavBar() {
  const [name, setName] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) navigate("login", { replace: true });
    else setName(session?.user?.name);
  }, []);
  return (
    <div>
      <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
        <Menu.Item key="Home">
          <img src={logo} alt={"logo"} width={50} />
        </Menu.Item>

        <Menu.Item
          key="Logo"
          icon={<HomeOutlined />}
          onClick={() => navigate("/")}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="Users"
          icon={<UserOutlined />}
          onClick={() => navigate("users")}
        >
          Users
        </Menu.Item>
        <Menu.Item style={{ marginLeft: "auto" }} key="username">
          {name}
        </Menu.Item>
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          onClick={() => {
            localStorage.removeItem("session");
            navigate("login");
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
      <Outlet />
    </div>
  );
}
