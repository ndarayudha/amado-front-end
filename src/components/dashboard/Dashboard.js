import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./dashboard.css";
import { Layout, Menu, Input, Badge, Avatar, Dropdown, message } from "antd";
import { Statistik } from "./Content/Statistik";
import IcAmado from "../../asset/ic_amado.png";

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

export const Dashboard = () => {
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
            <Link to="/dashboard">Statistik</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            Daftar Pasien
          </Menu.Item>
          <Menu.Item key="3" icon={<PushpinOutlined />}>
            Lokasi Pasien
          </Menu.Item>
          <Menu.Item key="4" icon={<PushpinOutlined />}>
            Lokasi Kontak Erat
          </Menu.Item>
          <Menu.Item key="5" icon={<FileTextOutlined />}>
            Rekam Medis
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
          ,
        </Header>
        <Content style={{ height: "100%" }}>
          <Statistik />
          <Switch>
            <Route path="/daftar-pasien"></Route>
            <Route path="/lokasi-pasien"></Route>
            <Route path="/kontak-erat"></Route>
            <Route path="/rekam-medis"></Route>
          </Switch>
        </Content>
        <Footer className="footer">Amado Dashboard</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
