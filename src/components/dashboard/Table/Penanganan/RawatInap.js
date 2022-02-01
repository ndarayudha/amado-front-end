import React, { useEffect, useState } from "react";
import "./isolasi-mandiri.css";
import icAmado from "../../../../asset/ic_amado.png";
import { Divider, Descriptions, Row, Col, Button } from "antd";
import moment from "moment";
import axios from "axios";
import { url } from "../../../../util/endpoints";
import { useSelector, useDispatch } from "react-redux";
import Chart from "react-apexcharts";
import GoogleMap from "../../Maps/GoogleMap";
import { GeoCodeMarker } from "../../Maps/GeoCodeMarker";
import { getRecordSensorDataById } from "../api";
import { useParams } from "react-router";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const getIdDoctor = () => {
  const storedId = sessionStorage.getItem("id");
  return storedId ? storedId : "";
};

const defaultProps = {
  center: {
    lat: -8.33562350780472,
    lng: 114.26583566963781,
  },
  zoom: 11,
};

export const RawatInap = (props) => {
  const [doctorBio, setDoctorBio] = useState("");

  const detailBio = useSelector((state) => state.records.detailBio);
  const firstRecordMonitoring = useSelector(
    (state) => state.records.firstRecordMonitoring
  );
  const secondRecordMonitoring = useSelector(
    (state) => state.records.secondRecordMonitoring
  );
  const thirdRecordMonitoring = useSelector(
    (state) => state.records.thirdRecordMonitoring
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  let tanggalLahir = props.pasien.tanggal_lahir;
  let splitData = tanggalLahir.split("-");
  let patientData = `${splitData[2]}-${splitData[1]}-${splitData[0]}`;

  const pdfExportComponent = React.useRef(null);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  useEffect(() => {
    dispatch(getRecordSensorDataById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const doctorId = getIdDoctor();

    axios({
      method: "get",
      url: `${url.prod}/doctor/bio?id=${doctorId}`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setDoctorBio(result.data.user);
      });
  }, []);

  const options = {
    chartOptions: {
      chart: {
        height: 350,
        type: "area",
        stacked: false,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        title: {
          text: "Spo2 & Bpm",
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  return (
    <div className="surat-container">
      <PDFExport margin="4cm" ref={pdfExportComponent}>
        <div style={{ padding: "50px 40px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div className="img-container">
              <img src={icAmado} alt="logo rumah sakit" />
            </div>
            <div>
              <h1>Nama Rumah Sakit</h1>
              <h4>Alamat Rumah Sakit</h4>
              <h4>Nomor Telepon Rumah Sakit</h4>
              <h4>Email Rumah Sakit</h4>
            </div>
          </div>
          <Divider />
          <h1 className="surat-title">REKAM MEDIS</h1>
          <br />
          <br />
          <br />
          <div className="keterangan-surat">
            <Descriptions title="Detail ">
              <Descriptions.Item label="No. Rk">
                {props.detail.rekam_medis_id}
              </Descriptions.Item>
              <Descriptions.Item label="Nama">
                {props.pasien.name}
              </Descriptions.Item>
              <Descriptions.Item label="Umur">
                {moment().diff(`${patientData}`, "years")}
              </Descriptions.Item>
              <Descriptions.Item label="Jenis Kelamin">
                {props.pasien.jenis_kelamin}
              </Descriptions.Item>
              <Descriptions.Item label="Alamat">
                {props.pasien.alamat}
              </Descriptions.Item>
              <Descriptions.Item label="Kesimpulan">
                {props.detail.kesimpulan}
              </Descriptions.Item>
              <Descriptions.Item label="Saran">
                {props.detail.saran}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <br />
          <br />
          <br />

          <Row>
            <div style={{ width: "100%", height: "300px" }}>
              <h4>Pengukuran ke 1</h4>
              <Chart
                options={options.chartOptions}
                series={firstRecordMonitoring.series}
                type="area"
                height={300}
                width={650}
              />
            </div>
          </Row>

          <Row style={{marginTop: '50px'}}>
            <div style={{ width: "100%", height: "300px" }}>
              <h4>Pengukuran ke 2</h4>
              <Chart
                options={options.chartOptions}
                series={secondRecordMonitoring.series}
                type="area"
                height={300}
                width={650}
              />
            </div>
          </Row>

          <Row style={{marginTop: '50px'}}>
            <div style={{ width: "100%", height: "300px" }}>
              <h4>Pengukuran ke 3</h4>
              <Chart
                options={options.chartOptions}
                series={thirdRecordMonitoring.series}
                type="area"
                height={300}
                width={650}
              />
            </div>
          </Row>

          <Row style={{marginTop: '60px'}}>
            <div style={{ width: "100%", height: "300px" }}>
              <h4>Lokasi Monitoring</h4>
              <GoogleMap
                defaultZoom={10}
                defaultCenter={defaultProps.center}
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_API,
                }}
              >
                <GeoCodeMarker
                  key={detailBio.id}
                  lat={detailBio.latitude}
                  lng={detailBio.longitude}
                  show={true}
                  patient={detailBio}
                />
              </GoogleMap>
            </div>
          </Row>

          <Row>
            <Col className="ttd" span={20}></Col>
            <Col className="ttd" span={4}>
              <div style={{ marginTop: "90px" }}>
                <h3>{moment().format("D MMMM YYYY")}</h3>
                <h3>Mengetahui</h3>
                <h3>Dokter</h3>
                <br />
                <br />
                <br />
                <h3>Dr. {doctorBio.name}</h3>
              </div>
            </Col>
          </Row>
        </div>
      </PDFExport>
      <div style={{ marginLeft: "auto", marginTop: "60px" }}>
        <Button key="submit" type="primary" onClick={exportPDFWithComponent}>
          Proses
        </Button>
      </div>
    </div>
  );
};
