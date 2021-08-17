import React, { useEffect } from "react";
import { Layout, Row, Col, Image, Card } from "antd";
import "./profil.css";
import { ProfileForm } from "../Form/ProfileForm";
import axios from "axios";

export const Profil = () => {
  useEffect(() => {
    axios.get("http://localhost:8000/");
  });

  return (
    <Layout>
      <Row
        gutter={16}
        justify="center"
        className="profil-detail-stat"
        style={{ height: "100%" }}
        data-aos="fade-up"
      >
        <Col span={20}>
          <Card className="profil-card">
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <ProfileForm />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
