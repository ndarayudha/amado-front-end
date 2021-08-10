import React from "react";
import "../../../util/global.css";
import classes from "./HomeContent.module.css";
import { Layout, Row, Col } from "antd";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HomeImg from "../../../asset/img_home.png";
import AboutImg from "../../../asset/img_about.png";
import AppImg from "../../../asset/img_app_double.png";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

const { Content } = Layout;

const HomeContent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
    AOS.refresh();
  }, []);

  return (
    <Content className={classes.home}>
      <article>
        <Row gutter={20}>
          <Col lg={6} xl={12}>
            <aside className={classes["flex-center"]} data-aos="fade-right">
              <div className={classes.description}>
                <h1>
                  Skalabilitas Teknologi <span>Kesehatan Pasien</span>
                </h1>
                <h4>
                  Pemantauan saturasi oksigen jarak jauh bagi pasien isolasi
                  mandiri Covid 19
                </h4>
                <Button second={false}>Pelajari Lanjut</Button>
              </div>
            </aside>
          </Col>
          <Col lg={24} xl={12}>
            <aside data-aos="fade-left">
              <div className={classes["img-container"]}>
                <img src={HomeImg} alt="" />
              </div>
            </aside>
          </Col>
        </Row>
      </article>
      <article className={classes.about}>
        <h2 className={classes.title} data-aos="fade-up">
          Tentang Sistem Kami
        </h2>
        <Row gutter={20}>
          <Col lg={12} xl={12}>
            <aside data-aos="fade-up">
              <div className={classes["img-container"]}>
                <img src={AboutImg} alt="about-img" />
              </div>
            </aside>
          </Col>
          <Col lg={12} xl={12}>
            <aside className={classes["flex-center"]} data-aos="fade-up">
              <div className={classes.description}>
                <h2>Modernisasi Pengalaman Pasien</h2>
                <p>
                  Amado E-Health dapat melakukan proses monitoring kadar oksigen
                  terlarut dalam darah pada pasien Covid-19 yang menjalani
                  isolasi mandiri dan terintegrasi melalui smartphone, dan
                  menghasilkan rekam medis melalui analisis data di website
                </p>
              </div>
            </aside>
          </Col>
        </Row>
      </article>
      <article className="work">
        <h2 className={classes.title}>Cara Kerja Sistem</h2>
        <Row gutter={[30, 30]} justify="center" data-aos="fade-up">
          <Col xs={24} sm={12} md={12} lg={12} xl={8}>
            <Card third={true}>
              <div className={classes["work-description"]}>
                <div>1</div>
                <h6>Registrasi</h6>
                <p>Pasien melakukan pendaftaran akun melalui aplikasi Amado</p>
              </div>
            </Card>
          </Col>
          <Col sm={12} md={12} lg={12} xl={8}>
            <Card third={true}>
              <div className={classes["work-description"]}>
                <div>2</div>
                <h6>Lengkapi Data</h6>
                <p>Pasien melengkapi data pribadi pada aplikasi</p>
              </div>
            </Card>
          </Col>
          <Col sm={12} md={12} lg={12} xl={8}>
            <Card third={true}>
              <div className={classes["work-description"]}>
                <div>3</div>
                <h6>Geolokasi</h6>
                <p>Pasien pasien mengaktifkan fitur geolokasi</p>
              </div>
            </Card>
          </Col>
          <Col sm={12} md={12} lg={12} xl={8}>
            <Card third={true}>
              <div className={classes["work-description"]}>
                <div>4</div>
                <h6>Monitoring</h6>
                <p>Pasien melakukan monitoring melalui perangkat Amado</p>
              </div>
            </Card>
          </Col>
          <Col sm={12} md={12} lg={12} xl={8}>
            <Card third={true}>
              <div className={classes["work-description"]}>
                <div>5</div>
                <h6>Pemantauan</h6>
                <p>Pasien dipantau oleh tenaga medis selama isolasi mandiri</p>
              </div>
            </Card>
          </Col>
          <Col sm={12} md={12} lg={12} xl={8}>
            <Card third={true}>
              <div className={classes["work-description"]}>
                <div>6</div>
                <h6>Rekam Medis</h6>
                <p>
                  Pasien mendapatkan hasil diagnosa serta rekomendasi penanganan
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </article>
      <article className={classes.app}>
        <Row>
          <Col lg={6} xl={12}>
            <aside className={classes["flex-center"]} data-aos="fade-up">
              <div className={classes.description}>
                <h1>Aplikasi Kami Telah Tersedia</h1>
                <h4>
                  Aplikasi kami telah tersedia untuk platform Android, download
                  sekarang melalui Google Playstore
                </h4>
                <Button second={false}>Download</Button>
              </div>
            </aside>
          </Col>
          <Col lg={12} xl={12}>
            <aside data-aos="fade-up">
              <div className={classes["img-container"]}>
                <img src={AppImg} alt="" />
              </div>
            </aside>
          </Col>
        </Row>
      </article>
    </Content>
  );
};

export default HomeContent;
