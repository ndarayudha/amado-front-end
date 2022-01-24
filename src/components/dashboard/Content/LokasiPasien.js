import React, { useEffect, useState } from "react";
import "./lokasi-pasien.css";
import { Row, Col, Card, List, Avatar } from "antd";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { url } from "../../../util/endpoints";
import GoogleMap from "../Maps/GoogleMap";
import { Marker } from "../Maps/Marker";

const listPatientStyle = {
  cursor: "pointer",

  "&:hover": {
    background: "grey",
  },
};

export const LokasiPasien = (props) => {
  const [patients, setPatients] = useState([]);
  const [coords, setCords] = useState({
    center: {
      lat: -8.33562350780472,
      lng: 114.26583566963781,
    },
    zoom: 11,
  })

  const defaultProps = {
    center: {
      lat: -8.33562350780472,
      lng: 114.26583566963781,
    },
    zoom: 11,
  };

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
    AOS.refresh();

    axios.get(`${url.prod}/doctor/patients`).then((res) => {
      let location = "";

      location = res.data.data;

      setPatients(location);
    });
  }, []);

  const onChildClickCallback = (key) => {
    setPatients((state) => {
      const index = patients.findIndex((e) => e.id === +key);
      patients[index].show = !patients[index].show;

      return [...state];
    });
  };

  const onShowDetail = (e) => {
    
  }

  return (
    <Row
      style={{ height: "100vh", width: "100%" }}
      data-aos="fade-up"
      justify="center"
      align="center"
      className="patient-map-stat"
    >
      <Card style={{ width: "100%", margin: "0 20px" }}>
        <Col span={7} style={{ marginRight: "5px" }}>
          <List
            itemLayout="horizontal"
            dataSource={patients}
            renderItem={(item) => (
                <List.Item onClick={() => onShowDetail(item)} style={listPatientStyle}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={item.alamat}
                  />
                </List.Item>
            )}
          />
        </Col>
        <Col span={17}>
          <div style={{ height: "90vh", width: "100%" }}>
            <GoogleMap
              defaultZoom={10}
              defaultCenter={defaultProps.center}
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
              onChildClick={onChildClickCallback}
            >
              {patients.map((patient) => (
                <Marker
                  key={patient.id}
                  lat={patient.latitude}
                  lng={patient.longitude}
                  show={patient.show}
                  patient={patient}
                />
              ))}
            </GoogleMap>
          </div>
        </Col>
      </Card>
    </Row>
  );
};
