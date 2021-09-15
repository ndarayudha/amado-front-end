import React, { useState, useEffect } from "react";
import axios from "axios";
import { NotificationConfirmPatientItem } from "./NotificationItem/NotificationConfirmPatientItem";
import { Menu, Skeleton } from "antd";
import { useHistory, Link } from "react-router-dom";

const getToken = () => {
  const storedToken = sessionStorage.getItem("token");
  return storedToken ? storedToken : "";
};

export const NotificationConfirmPatient = (props) => {
  const [notifications, setPatients] = useState();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // setLoading(!isLoading);
    let isActive = true;

    const tokenBearer = getToken();

    axios({
      method: "get",
      url: "http://localhost:8000/doctor/notification/patient",
      headers: { Authorization: `Bearer ${tokenBearer}` },
    })
      .then((response) => {
        setLoading(!isLoading);
        return response;
      })
      .then((result) => {
        if (isActive) {
          setPatients(result.data.notifications);
        }
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    setLoading(!isLoading);

    return () => {
      isActive = false;
    };
  }, []);

  const clickedHandler = (id) => {
    props.onClick();
  };

  let content;

  if (isLoading) {
    content = <Skeleton active />;
  }

  if (notifications) {
    content = notifications.map((item) => {
      return (
        <Link to="/patients">
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
