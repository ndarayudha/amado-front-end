import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Image, Card } from "antd";
import "./profil.css";
import { ProfileForm } from "../Form/ProfileForm";
import axios from "axios";

const getIdDoctor = () => {
  const storedId = sessionStorage.getItem("id");
  return storedId ? storedId : "";
};

export const Profil = () => {
  const [doctorBio, setDoctorBio] = useState("");

  useEffect(() => {
    const doctorId = getIdDoctor();

    axios({
      method: "get",
      url: `http://localhost:8000/doctor/bio?id=${doctorId}`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setDoctorBio(result.data.user);
      });
  }, []);

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
            {doctorBio && <ProfileForm biodata={doctorBio} />}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
