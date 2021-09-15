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
import { NotificationConfirmPatient } from "./Notification/NotificationConfirmPatient";
import { NotificationMedicalRecord } from "./Notification/NotificationMedicalRecord";

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
  

  const notificationList = (
    <Menu className="dropdown-padding">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Pasien Baru" key="1">
            <NotificationConfirmPatient onClick={onVisibleHandler}/>
        </TabPane>
        <TabPane tab="Rekam Medis" key="2">
            <NotificationMedicalRecord/>
        </TabPane>
      </Tabs>
    </Menu>
  );

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
            onVisibleChange={(visibility) => {
              onVisibleHandler(visibility);
            }}
            trigger={['click']}
          >
            <Badge count={5}>
                <BellFilled style={{ fontSize: "22px", cursor: "pointer" }} />
            </Badge>
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
