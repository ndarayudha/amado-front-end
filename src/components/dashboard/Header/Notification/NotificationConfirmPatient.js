import React from "react";
import { NotificationConfirmPatientItem } from "./NotificationItem/NotificationConfirmPatientItem";
import { Menu} from "antd";
import { Link } from "react-router-dom";


export const NotificationConfirmPatient = (props) => {

  const clickedHandler = (id) => {
    props.onClick();
  };

  let content;

  if(props.notificationList.length === 0){
    content = <h4 style={{ textAlign: 'center' }}>Kosong</h4>
  }

  if (props.notificationList.length > 0) {
    content = props.notificationList.map((item) => {
      return (
        <Link to="/konfirmasi" key={item.id}>
          <Menu.Item onClick={clickedHandler}>
          <NotificationConfirmPatientItem
            key={item.id}
            patient={item.data.patient}
            type={item.type}
          />
        </Menu.Item>
        </Link>
      );
    });
  }

  return <React.Fragment>{content}</React.Fragment>;
};
