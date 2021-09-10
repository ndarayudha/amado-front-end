import React, { useContext, useState } from "react";
import Echo from "laravel-echo";
import "./header.css";
import {
  Layout,
  Menu,
  Input,
  Dropdown,
  Badge,
  Image,
  notification,
  Tabs,
} from "antd";

import { SearchOutlined, DownOutlined, BellFilled } from "@ant-design/icons";
import AuthContext from "../../../context/auth-context";
import { useHistory } from "react-router-dom";

const { Header } = Layout;
const { TabPane } = Tabs;

window.Pusher = require("pusher-js");

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "myKey",
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});

window.Echo.channel("patient-registered-channel").listen(
  ".PatientRegisteredEvent",
  (e) => {
    openNotification(e);
  }
);

const openNotification = (e) => {
  notification.info({
    message: `Pasien Baru`,
    description: `Nama : ${e.name}\n`,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

function callback(key) {
  console.log(key);
}

const notificationList = (
  <Menu className="dropdown-padding">
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Pasien Baru" key="1">
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        </Menu.Item>
      </TabPane>
      <TabPane tab="Rekam Medis" key="2">
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            2st menu item
          </a>
        </Menu.Item>
      </TabPane>
    </Tabs>
  </Menu>
);

export const DashboardHeader = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [overlay, setOverlay] = useState(false);

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

  const onVisibleHandler = (visible) => {
    if(visible){
      setOverlay(!overlay);
    }
    setOverlay(!overlay);
  };

  return (
    <div className={`${overlay ? 'overlay' : ''}`}>
      <Header theme="light" className="header">
        <Input
          className="header-input"
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
        />
        <div style={{ marginRight: "100px" }}>
          <Dropdown
            overlay={notificationList}
            placement="bottomCenter"
            className="dropdown-notification"
            onVisibleChange={(visibility) => onVisibleHandler(visibility)}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Badge count={5}>
                <BellFilled style={{ fontSize: "22px" }} />
              </Badge>
            </a>
          </Dropdown>
        </div>
        <Image
          width={50}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
      </Header>
    </div>
  );
};
