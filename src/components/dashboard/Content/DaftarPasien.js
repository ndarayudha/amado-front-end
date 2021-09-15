import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Layout,
  Table,
  Card,
  Image,
  Space,
  message,
  Skeleton,
  Button,
} from "antd";
import "./daftar-pasien.css";
import { DetailMap } from "../Maps/DetailMap";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export const DaftarPasien = () => {
  const [patients, setPatients] = useState();
  const [photo, setPhoto] = useState("");
  const [currentMonitoring, setCurrentMonitoring] = useState("");
  const [currentDataSensor, setCurrentDataSensor] = useState("");
  const [curerntPatientLocation, setCurrentPatientLocation] = useState("");
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    getListPatient();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
    AOS.refresh();
  }, []);

  // * Get detail patient
  const getDetailHandler = (patientId) => {
    setPatientId(patientId);
    getPatientPhoto(patientId);
    getPatientCurrentMonitoring(patientId);
    getPatientCurrentSensorData(patientId);
    getPatientCurrentLocation(patientId);
  };

  const getListPatient = () => {
    // * Get List Patient
    axios({
      method: "get",
      url: `http://localhost:8000/doctor/patients`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setPatients(result.data.data);
      })
      .catch(() => {
        message.error("Pastikan data telah diisi dengan benar");
      });
  };

  // * Get photo base 64
  const getPatientPhoto = (patientId) => {
    axios({
      method: "get",
      url: `http://localhost:8000/doctor/patient/photo?id=${patientId}`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setPhoto(result.data.message);
      })
      .catch(() => {});
  };

  // * Get patient Current monitoring
  const getPatientCurrentMonitoring = (patientId) => {
    axios({
      method: "get",
      url: `http://localhost:8000/doctor/patient/monitoring?id=${patientId}`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setCurrentMonitoring(result.data.data);
      })
      .catch(() => {});
  };

  // * Get Patient Current Sensor Data
  const getPatientCurrentSensorData = (patientId) => {
    axios({
      method: "get",
      url: `http://localhost:8000/doctor/patient/sensor?id=${patientId}`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setCurrentDataSensor(result.data.data);
      })
      .catch(() => {});
  };

  // * Get Patient Current location
  const getPatientCurrentLocation = (patientId) => {
    axios({
      method: "get",
      url: `http://localhost:8000/doctor/patient/location?id=${patientId}`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setCurrentPatientLocation(result.data.coordinat);
      })
      .catch(() => {});
  };

  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenis_kelamin",
      width: 150,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
    },
    {
      title: "Aksi",
      id: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              getDetailHandler(text.id);
            }}
          >
            Detali
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Row
        gutter={16}
        justify="center"
        className="patient-detail-stat"
        style={{ height: "100%" }}
        data-aos="fade-up"
      >
        <Col span={12} className="card-center">
          {patients ? (
            <Table
              columns={columns}
              dataSource={patients}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 240 }}
            />
          ) : (
            <Skeleton />
          )}
        </Col>
        <Col span={10}>
          <Card className="card-detail-patient" style={{ width: 450 }}>
            <div className="card-container">
              <div className="map-patient">
                {curerntPatientLocation ? (
                  <DetailMap coordinat={curerntPatientLocation} />
                ) : (
                  "No Location"
                )}
              </div>
              <div className="desc-container">
                <div className="desc-second">
                  <h2>Terakhir Monitoring</h2>
                  <p>
                    {currentMonitoring
                      ? currentMonitoring.currentMonitoring
                      : "No Data"}
                  </p>
                </div>
              </div>
              <div className="patient-photo-container">
                <div className="inner-detail">
                  <Image
                    width={200}
                    src={`${photo}`}
                    fallback="data:image/png;base64,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"
                  />
                  <Link to={`patient/rekam-medis/${patientId}`}>
                    Rekam Medis
                  </Link>
                </div>
                <div className="monitoring-current">
                  <div className="total-cek">
                    <h3>Total Cek</h3>
                    <p>
                      {currentMonitoring
                        ? currentMonitoring.totalMonitoring
                        : "No Data"}
                    </p>
                  </div>
                  <div className="total-spo2">
                    <h3>Spo2</h3>
                    <p>
                      {currentDataSensor ? currentDataSensor.spo2 : "No Data"}
                    </p>
                  </div>
                  <div className="total-bpm">
                    <h3>Bpm</h3>
                    <p>
                      {currentDataSensor ? currentDataSensor.bpm : "No Data"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
