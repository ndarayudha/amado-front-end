import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "./lokasi-pasien.css";
import { Row, Col, Layout, Card } from "antd";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { url } from "../../../util/endpoints";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export const LokasiPasien = (props) => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  // useEffect(() => {
  //   AOS.init({
  //     duration: 300,
  //   });
  //   AOS.refresh();

  //   axios.get(`${url.prod}/doctor/geolocation/patient/all`).then((res) => {
  //     let location = "";

  //     location = res.data.data;

  //     console.log(location);
  //   });
  // }, []);

  return (
    <Row

      style={{ height: "100vh", width: "100%" }}
      data-aos="fade-up"
      justify="center"
      align="center"
      className="patient-map-stat"
    >
      <Card style={{ width: "100%", margin: "0 20px" }}>
        <Col span={8}>
          <h1>Right</h1>
        </Col>
        <Col span={16}>
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyDFxk7pvFBDdyXU30zjjjMo2h5wqovB308",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </Col>
      </Card>
    </Row>
  );
};
