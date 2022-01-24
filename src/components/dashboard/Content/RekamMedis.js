import React, {useEffect} from "react";
import { Row, Col} from "antd";
import "./rekam-medis.css";
import { RekamMedisList } from "../Table/RekamMedisList";
import AOS from "aos";
import "aos/dist/aos.css";

export const RekamMedis = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <Row
        gutter={16}
        justify="center"
        className="record-stat"
        style={{ height: "100%" }}
        data-aos="fade-up"
      >
        <Col span={22}>
          <RekamMedisList />
        </Col>
      </Row>
    </div>
  );
};
