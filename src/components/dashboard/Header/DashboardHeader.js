import React, { useContext, useState, useEffect } from "react";
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
// import { NotificationMedicalRecord } from "./Notification/NotificationMedicalRecord";
import axios from "axios";
import {url} from '../../../util/endpoints';
window.Pusher = require("pusher-js");

const { Header } = Layout;
const { TabPane } = Tabs;


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


const getToken = () => {
  const storedToken = sessionStorage.getItem("token");
  return storedToken ? storedToken : "";
};


export const DashboardHeader = () => {
  const [notifications, setNotifications] = useState([]);
  const [totalBadge, setTotalBadge] = useState();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [overlay, setOverlay] = useState(false);
  
  useEffect(() => {
    let isActive = true;

    getUnreadNotifications(isActive);
    
    return () => {
      isActive = false;
      setNotifications(null);
    };
  }, []);


  const getUnreadNotifications = (isActive) => {
    const tokenBearer = getToken();

    console.log('call function');
  
    axios({
      method: "get",
      url: `${url.prod}/doctor/notification/patient`,
      headers: { Authorization: `Bearer ${tokenBearer}` },
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
         if(isActive){
          if(result.data.notifications.length > 0){
            setTotalBadge(result.data.notifications.length);
            setNotifications(result.data.notifications);
          }
         }
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  };

  // if(isAnyNewNotification){
  //   getUnreadNotifications(true);
  // }

  const onClick = ({ key }) => {
    if (key === "1") {
      authCtx.logout();
      history.replace("/");
    }
  };

  
  const onVisibleHandler = (visible) => {
    if (visible) {
      setOverlay(!overlay);
    }
    setOverlay(!overlay);
  };


  // Drop Down menu
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Logout</Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  const notificationList = (
    <Menu className="dropdown-padding">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Pasien Baru" key="1">
          <NotificationConfirmPatient
            onClick={onVisibleHandler}
            notificationList={notifications && notifications}
          />
        </TabPane>
        {/* <TabPane tab="Rekam Medis" key="2">
          <NotificationMedicalRecord onClick={onVisibleHandler} />
        </TabPane> */}
      </Tabs>
    </Menu>
  );

  return (
    <div className={`${overlay ? "overlay" : ""}`}>
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
            trigger={["click"]}
          >
            <Badge count={totalBadge}>
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
