import React from "react";
import { Row, Col, Layout, Input, Card } from "antd";
import "./rekam-medis.css";

import { SearchOutlined } from "@ant-design/icons";
import { RekamMedisList } from "../Table/RekamMedisList";

export const RekamMedis = () => {
  return (
    <Layout>
      <Row
        gutter={16}
        justify="center"
        className="record-stat"
        style={{ height: "100%" }}
        data-aos="fade-up"
      >
        <Col span={22}>
          <Input
            className="record-input"
            size="large"
            placeholder="Search"
            prefix={<SearchOutlined />}
          />
          <RekamMedisList />
        </Col>
      </Row>
    </Layout>
  );
};
