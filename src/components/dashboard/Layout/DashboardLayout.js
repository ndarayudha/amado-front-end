import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { Layout, Menu, Input, Badge, Avatar, Dropdown, message } from "antd";
import IcAmado from "../../../asset/ic_amado.png";

import {
  PieChartOutlined,
  TeamOutlined,
  PushpinOutlined,
  FileTextOutlined,
  SearchOutlined,
  NotificationOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

export const DashboardLayout = (props) => {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

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
    <Layout className="full">
      <Sider className="sidebar">
        <div className="logo">
          <h1>Amado</h1>
          <img src={IcAmado} alt="" />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/statistik">Statistik</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            <Link to="/patients">Daftar Pasien</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PushpinOutlined />}>
            <Link to="/lokasi-pasien">Lokasi Pasien</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<PushpinOutlined />}>
            <Link to="/kontak-erat">Lokasi Kontak Erat</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FileTextOutlined />}>
            <Link to="/rekam-medis">Rekam Medis</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ height: "100%" }}>
        <Header theme="light" className="header">
          <Input
            className="header-input"
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
          />
          <Badge count={5}>
            <Avatar
              icon={<NotificationOutlined />}
              shape="circle"
              size="large"
            />
          </Badge>
          <img src="https://i.ibb.co/mX0GYNQ/1626148315802.png" alt="profile" />
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              Profile <DownOutlined />
            </a>
          </Dropdown>
        </Header>
        <Content style={{ height: "100%" }}>{props.children}</Content>
        <Footer className="footer-dashboard">Amado Dashboard</Footer>
      </Layout>
    </Layout>
  );
};
