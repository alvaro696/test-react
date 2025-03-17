import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const UserDropdown = () => {
  const { user, logout } = useAuth();

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={logout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <Button type="text" style={{ marginRight: 10 }}>
        <UserOutlined style={{ marginRight: 5 }} />
        {user.username} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default UserDropdown;
