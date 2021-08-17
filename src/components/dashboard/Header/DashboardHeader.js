import React, { useContext } from "react";
import { Layout, Menu, Input, Dropdown, message } from "antd";

import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import AuthContext from "../../../context/auth-context";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

export const DashboardHeader = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const onClick = ({ key }) => {
    if (key === "1") {
      authCtx.logout();
      history.replace("/");
    }
  };

  // Drop Down menu
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Logout</Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  return (
    <Header theme="light" className="header">
      <Input
        className="header-input"
        size="large"
        placeholder="Search"
        prefix={<SearchOutlined />}
      />
      {/* <Badge count={5}>
        <Avatar icon={<NotificationOutlined />} shape="circle" size="large" />
      </Badge> */}
      <img src="https://i.ibb.co/mX0GYNQ/1626148315802.png" alt="profile" />
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
          Profile <DownOutlined />
        </a>
      </Dropdown>
    </Header>
  );
};
