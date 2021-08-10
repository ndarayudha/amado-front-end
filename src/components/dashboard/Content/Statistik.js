import React, { useEffect } from "react";
import "./statistik.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Row, Col, Card, Layout } from "antd";
import icBed from "../../../asset/ic_dashboard/ic_bed_dashboard.png";
import icCloseContact from "../../../asset/ic_dashboard/ic_close_contact.png";
import icMedicalRecord from "../../../asset/ic_dashboard/ic_record_dashboard.png";
import { UsiaChart } from "../Chart/UsiaChart";
import { JenisKelamin } from "../Chart/JenisKelamin";
import { CurrentMonitoringList } from "../Table/CurrentMonitoringList";
import { CurrentStatus } from "../Table/CurrentStatus";

export const Statistik = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);

  return (
    <Layout>
      <Row justify="center" className="patient-stat" style={{ height: "100%" }}>
        <Col span={8} className="card-center" data-aos="fade-up">
          <div className="site-card-border-less-wrapper" data-aos="fade-up">
            <Card className="card-stat" bordered={true} style={{ width: 300 }}>
              <img src={icBed} alt="" />
              <div className="first-row-desc">
                <h3>{0}</h3>
                <p>Pasien</p>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={8} className="card-center">
          <div className="site-card-border-less-wrapper">
            <Card bordered={true} style={{ width: 300 }}>
              <img src={icCloseContact} alt="" />
              <div className="first-row-desc">
                <h3>{0}</h3>
                <p>Kontak Erat Pasien</p>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={8} className="card-center">
          <div className="site-card-border-less-wrapper">
            <Card bordered={true} style={{ width: 300 }}>
              <img src={icMedicalRecord} alt="" />
              <div className="first-row-desc">
                <h3>{0}</h3>
                <p>Rekam Medis Pasien</p>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <Row
        justify="start"
        className="patient-stat"
        style={{ height: "100%", marginTop: "10px" }}
      >
        <Col span={24} className="card-center">
          <div className="site-card-border-less-wrapper">
            <Card
              className="pie-center"
              bordered={false}
              style={{ width: 530, height: 350, marginTop: 30 }}
            >
              <UsiaChart />
            </Card>
          </div>
          <div className="site-card-border-less-wrapper">
            <Card
              className="pie-center"
              bordered={false}
              style={{ width: 530, height: 350, marginTop: 30 }}
            >
              <JenisKelamin />
            </Card>
          </div>
        </Col>
      </Row>
      <Row
        justify="start"
        className="patient-stat"
        style={{ height: "100%", marginTop: "30px" }}
      >
        <Col span={12} className="card-center">
          <CurrentMonitoringList />
        </Col>
        <Col span={12} className="card-center">
          <CurrentStatus />
        </Col>
      </Row>
    </Layout>
  );
};
