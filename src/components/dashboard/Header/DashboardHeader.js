import React from "react";
import { Layout, Menu, Input, Dropdown, message } from "antd";

import { SearchOutlined, DownOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const DashboardHeader = () => {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  // Drop Down menu
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
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
