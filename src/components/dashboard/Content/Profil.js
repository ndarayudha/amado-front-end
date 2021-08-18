import React, { useEffect, useState, useCallback } from "react";
import {
  Layout,
  Row,
  Col,
  Image,
  Card,
  Skeleton,
  Upload,
  message,
  Button,
} from "antd";
import "./profil.css";
import { ProfileForm } from "../Form/ProfileForm";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const getIdDoctor = () => {
  const storedId = sessionStorage.getItem("id");
  return storedId ? storedId : "";
};

const getToken = () => {
  const storedToken = sessionStorage.getItem("token");
  return storedToken ? storedToken : "";
};

export const Profil = () => {
  const [doctorBio, setDoctorBio] = useState("");
  const [token, setToken] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const doctorId = getIdDoctor();
    const tokenBearer = getToken();
    setToken(tokenBearer);

    getPhoto();

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
  }, [token]);

  // * Send Photo base 64
  const sendPhoto = (base64) => {
    const photo = {
      photo: base64,
    };

    axios({
      method: "post",
      url: `http://localhost:8000/doctor/add-profile-photo`,
      headers: { Authorization: `Bearer ${token}` },
      data: photo,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        message.success(result.data.message);
      })
      .catch(() => {
        message.error("file upload failed.");
      });
  };

  // * Get photo base 64
  const getPhoto = () => {
    axios({
      method: "post",
      url: `http://localhost:8000/doctor/user-profile`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        // convert to File

        // set state Photo
        setPhoto(result.data.message);
        console.log(result.data.message);
      })
      .catch(() => {});
  };

  console.log(photo);

  const props = {
    name: "file",
    action: "http://localhost:8000/doctor/add-profile-photo",
    headers: {
      authorization: `Bearer ${token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        let reader = new FileReader();
        reader.onloadend = () => {
          sendPhoto(reader.result);
        };
        reader.readAsDataURL(info.file.originFileObj);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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
            {photo ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItem: "center",
                  textAlign: "center",
                }}
              >
                <Image
                  width={200}
                  style={{ marginBottom: "10px" }}
                  src={`${photo}`}
                />
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Unggah Foto</Button>
                </Upload>
              </div>
            ) : (
              <Skeleton active style={{ width: "20px" }} />
            )}

            {doctorBio ? (
              <ProfileForm biodata={doctorBio} />
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
