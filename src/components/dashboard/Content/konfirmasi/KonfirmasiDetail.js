import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Row, Col, Card } from "antd";

export const KonfirmasiDetail = () => {
  let { id } = useParams();

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Row
        gutter={16}
        justify="center"
        className="konfirmasi"
        style={{ height: "100%", width: "100%" }}
        data-aos="fade-up"
      >
        <Col span={22}>
          <Card>
              <h1>Detail Pasien id : {id}</h1>
          </Card>
        </Col>
      </Row>
    </>
  );
};

