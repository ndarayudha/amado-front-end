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
import { url } from "../../../util/endpoints";
import { useSelector, useDispatch } from "react-redux";
import { getDoctorProfile } from "../Content/profil/api";

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

const getIdDoctor = () => {
  const storedId = sessionStorage.getItem("id");
  return storedId ? storedId : "";
};

export const DashboardHeader = () => {
  const [notifications, setNotifications] = useState([]);
  const [totalBadge, setTotalBadge] = useState();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [overlay, setOverlay] = useState(false);

  const doctorId = getIdDoctor();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctorProfile(doctorId));
  }, [dispatch, doctorId]);

  const doctor = useSelector((state) => state.profil.doctor);

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

    console.log("call function");

    axios({
      method: "get",
      url: `${url.prod}/doctor/notification/patient`,
      headers: { Authorization: `Bearer ${tokenBearer}` },
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        if (isActive) {
          if (result.data.notifications.length > 0) {
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
          src={`${doctor ? doctor.photo : ''}`}
          fallback="data:image/png;base64,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"
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
