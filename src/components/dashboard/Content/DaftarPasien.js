import React, { useState } from "react";
import { Row, Col, Layout, Table, Card, Image, Space } from "antd";
import "./daftar-pasien.css";
import { DetailMap } from "../Maps/DetailMap";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a href="#">Detail</a>
      </Space>
    ),
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export const DaftarPasien = () => {
  const [search, setSearch] = useState({
    searchText: "",
    searchedColumn: "",
  });

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
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 240 }}
          />
        </Col>
        <Col span={10}>
          <Card className="card-detail-patient" style={{ width: 450 }}>
            <div className="card-container">
              <div className="map-patient">
                <DetailMap />
              </div>
              <div className="desc-container">
                <div>
                  <h2>{"Nama Pasien"}</h2>
                  <p>{"Alamat Pasien"}</p>
                </div>
                <div className="desc-second">
                  <h2>{"Terakhir Cek"}</h2>
                  <p>{"18:00"}</p>
                </div>
              </div>
              <div className="patient-photo-container">
                <div className="inner-detail">
                  <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                  <Link to="/patients/medical">Rekam Medis</Link>
                </div>
                <div className="monitoring-current">
                  <div className="total-cek">
                    <h3>Total Cek</h3>
                    <p>{2}</p>
                  </div>
                  <div className="total-spo2">
                    <h3>Total Spo2</h3>
                    <p>{99}</p>
                  </div>
                  <div className="total-bpm">
                    <h3>Total Bpm</h3>
                    <p>{89}</p>
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
