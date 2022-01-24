import React, { useEffect } from "react";
// import H from "@here/maps-api-for-javascript";
import "./kontak-erat.css";
import { Row, Layout } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";

export const KontakErat = (props) => {
  
  useEffect(() => {
    AOS.init({
      duration: 300,
    });
    AOS.refresh();
  }, []);



  return (
    <Layout>
      <Row
        gutter={16}
        justify="center"
        className="contact-map-stat"
        style={{ height: "100%" }}
        data-aos="fade-up"
      >
        {/* <Col span={22}>
          <Card style={{ width: "100%" }}>
            <div
              ref={mapRef}
              className="contact-all-map"
              id="contact-map-container"
            ></div>
          </Card>
        </Col> */}
      </Row>
    </Layout>
  );
};
