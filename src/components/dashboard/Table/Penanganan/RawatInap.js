import React, { Fragment, useEffect, useState } from "react";
import "./isolasi-mandiri.css";
import icAmado from "../../../../asset/ic_amado.png";
import { Divider, Descriptions, Row, Col } from "antd";
import moment from "moment";
import axios from "axios";

const getIdDoctor = () => {
  const storedId = sessionStorage.getItem("id");
  return storedId ? storedId : "";
};

export const RawatInap = (props) => {
  const [doctorBio, setDoctorBio] = useState("");

  let tanggalLahir = props.pasien.tanggal_lahir;
  let splitData = tanggalLahir.split("-");
  let patientData = `${splitData[2]}-${splitData[1]}-${splitData[0]}`;

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
    <div className="surat-container">
      <div className="kop-kontainer">
        <div className="img-container">
          <img src={icAmado} alt="logo rumah sakit" />
        </div>
        <div className="rs-title-container">
          <h1>Nama Rumah Sakit</h1>
          <h4>Alamat Rumah Sakit</h4>
          <h4>Nomor Telepon Rumah Sakit</h4>
          <h4>Email Rumah Sakit</h4>
        </div>
      </div>
      <Divider />
      <h1 className="surat-title">SURAT KETERANGAN RAWAT INAP</h1>
      <br />
      <br />
      <br />
      <div className="keterangan-surat">
        <Descriptions title="Menerangkan dengan sesungguhnya bahwa :">
          <Descriptions.Item label="No. Rk">
            {props.detail.rekam_medis_id}
          </Descriptions.Item>
          <Descriptions.Item label="Nama">
            {props.pasien.name}
          </Descriptions.Item>
          <Descriptions.Item label="Umur">
            {moment().diff(`${patientData}`, "years")}
          </Descriptions.Item>
          <Descriptions.Item label="Diagnosa">
            {props.detail.diagnosa}
          </Descriptions.Item>
          <Descriptions.Item label="Jenis Kelamin">
            {props.pasien.jenis_kelamin}
          </Descriptions.Item>
          <Descriptions.Item label="Alamat">
            {props.pasien.alamat}
          </Descriptions.Item>
          <Descriptions.Item label="Keterangan">
            {props.detail.saran}
          </Descriptions.Item>
          <Descriptions.Item label="Tindakan">
            {props.detail.tindakan}
          </Descriptions.Item>
          <Descriptions.Item label="Tanggal Masuk">
            {props.detail.tanggal_masuk}
          </Descriptions.Item>
          <Descriptions.Item label="Tanggal Keluar">
            {props.detail.tanggal_keluar}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <br />
      <br />
      <br />
      <Row>
        <Col span={20}></Col>
        <Col className="ttd" span={4}>
          <div>
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
      <div className="tanda tangan"></div>
    </div>
  );
};
