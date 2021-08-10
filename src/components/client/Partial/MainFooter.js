import React from "react";
import { Layout, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";
import "../../../util/global.css";
import classes from "./MainFooter.module.css";
const { Footer } = Layout;

const MainFooter = () => {
  return (
    <Footer className={classes.footer}>
      <footer>
        <Row
          justify="center"
          gutter={{ xs: 50, sm: 100, md: 70, lg: 80, xl: 100 }}
        >
          <Col xs={24} xl={5}>
            <h3>Kategori</h3>
            <a href="https://www.instagram.com/amado_ehealth/">Teknologi</a>
            <a href="https://www.instagram.com/amado_ehealth/">Untuk RS</a>
            <Link to="/login">Login RS</Link>
            <a href="https://www.instagram.com/amado_ehealth/">Download</a>
          </Col>
          <Col xs={24} xl={5}>
            <h3>Bantuan</h3>
            <a href="https://www.instagram.com/amado_ehealth/">Tentang Kami</a>
            <a href="https://www.instagram.com/amado_ehealth/">Hubungi Kami</a>
            <a href="https://www.instagram.com/amado_ehealth/">
              Privacy Policy
            </a>
          </Col>
          <Col xs={24} xl={5}>
            <h3>Support</h3>
            <a href="https://www.instagram.com/amado_ehealth/">Vectorjuice</a>
            <a href="https://www.instagram.com/amado_ehealth/">LTE Team</a>
            <a href="https://www.instagram.com/amado_ehealth/">Jayla Tech.id</a>
            <a href="https://www.instagram.com/amado_ehealth/">Kontribusi</a>
          </Col>
          <Col xs={24} xl={5}>
            <h3>Alamat Kami</h3>
            <p>
              Jalan Raya Jember No.KM13, Kawang, Labanasem, Kec. Kabat,
              Kabupaten Banyuwangi, Jawa Timur 68461
            </p>
            <h3>Hubungi Kami</h3>
            <p>085236824033</p>
          </Col>
        </Row>
        <Divider
          style={{ borderWidth: 2, borderColor: "#ffff", color: "#fff" }}
        >
          Follow kami di
        </Divider>
        <Row justify="center">
          <Col>
            <div className={classes.yeah}>
              <a
                rel="noreferrer"
                className={classes.instagram}
                href="https://www.instagram.com/amado_ehealth/"
                target="_blank"
              >
                {" "}
              </a>
              <p>Copyright © 2021 Amado E-Health</p>
            </div>
          </Col>
        </Row>
      </footer>
    </Footer>
  );
};

export default MainFooter;
