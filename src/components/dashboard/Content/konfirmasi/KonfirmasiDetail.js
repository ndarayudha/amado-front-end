import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Row,
  Col,
  Card,
  Image,
  Skeleton,
  Divider,
  Form,
  Input,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getNewPatientDataById, konfirmasiPasien } from "./api";
import styles from "./konfirmasi-detail.module.css";
import { konfirmasiActions } from "./konfirmasi-slice";

export const KonfirmasiDetail = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const detailPatient = useSelector((state) => state.konfirmasi.patientDetail);
  const loading = useSelector((state) => state.konfirmasi.loading);

  useEffect(() => {
    dispatch(getNewPatientDataById(id));
  }, [dispatch, id]);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });

    AOS.refresh();
  }, []);

  const onFinish = (konfirmasiData) => {
    dispatch(konfirmasiActions.setLoading());
    dispatch(konfirmasiPasien(detailPatient.id, konfirmasiData));
    if (!loading) {
      history.push("/konfirmasi");
      dispatch(konfirmasiActions.setLoading());
    }
  };

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
            {!detailPatient ? (
              <Skeleton active />
            ) : (
              <div style={{ width: "100%" }}>
                <h1 style={{ fontSize: "20px", color: "#3c3c3c" }}>
                  Konfirmasi Pasien / {detailPatient.name}
                </h1>
                <Divider />
                <div className={styles.biodata}>
                  <Image
                    width={280}
                    height={280}
                    style={{ marginBottom: "30px" }}
                    src={`${detailPatient.photo}`}
                    fallback="data:image/png;base64,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"
                  />
                  <Form
                    className={styles.form__biodata}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 200 }}
                    initialValues={{
                      name: detailPatient.name,
                      alamat: detailPatient.alamat,
                      nik: detailPatient.nik,
                      phone: detailPatient.phone,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Nama"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                          disable: true,
                        },
                      ]}
                    >
                      <Input disabled="true" />
                    </Form.Item>

                    <Form.Item
                      label="Alamat"
                      name="alamat"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input disabled="true" />
                    </Form.Item>

                    <Form.Item
                      label="NIK"
                      name="nik"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input disabled="true" />
                    </Form.Item>

                    <Form.Item
                      label="No. Hp"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input disabled="true" />
                    </Form.Item>

                    <Form.Item
                      label="Kode Konfirmasi"
                      name="kode_konfirmasi"
                      rules={[
                        {
                          required: true,
                          message: "Masukan Kode konfirmasi pasien",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading ? loading : false}
                      >
                        Konfirmasi
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};
