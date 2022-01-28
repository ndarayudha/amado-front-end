import React, { useEffect } from "react";
import { Row, Col  } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";

import { KonfirmasiTabel } from "./KonfirmasiTabel";
import { fetchNewPatientsData } from "./api";

import "./konfirmasi.css";

export const Konfirmasi = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewPatientsData())
  }, [dispatch])

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
        className="konfirmasi"
        style={{ height: "100%", width: "100%" }}
        data-aos="fade-up"
      >
        <Col span={22}>
          <KonfirmasiTabel />
        </Col>
      </Row>
    </div>
  );
};
