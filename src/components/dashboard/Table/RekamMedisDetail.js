import React from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Card, Tabs, Image, Input } from "antd";
import "./rekamMedisDetail.css";
import { Sensors } from "../Chart/Sensors";
import { Penanganan } from "./Penanganan/Penanganan";
import { KontakPasienMap } from "../Maps/KontakPasienMap";

const { TabPane } = Tabs;
const { TextArea } = Input;

export const RekamMedisDetail = () => {
  let { id } = useParams();

  function callback(key) {
    console.log(key);
  }

  return (
    <Layout>
      <Row
        gutter={16}
        justify="center"
        className="record-list"
        style={{ height: "100%" }}
        data-aos="fade-up"
      >
        <Col span={7}>
          <Card style={{ width: 300 }}>
            <div>
              <Image
                style={{ marginBottom: "10px" }}
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Nama"
                value={""}
              />
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Umur"
                value={""}
              />
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Spo2"
                value={""}
              />
              <Input
                style={{ marginBottom: "10px" }}
                placeholder="Bpm"
                value={""}
              />
              <TextArea
                style={{ marginBottom: "10px" }}
                placeholder="Alamat"
                value={""}
              />
            </div>
          </Card>
        </Col>
        <Col span={15}>
          <Card style={{ width: "100%" }}>
            <Tabs
              defaultActiveKey="1"
              onChange={callback}
              style={{ width: "100%" }}
            >
              <TabPane tab="Hasil Monitoring" key="1">
                <Sensors />
              </TabPane>
              <TabPane tab="Kontak Erat" key="2">
                <KontakPasienMap />
              </TabPane>
              <TabPane tab="Penanganan" key="3">
                <Penanganan />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
