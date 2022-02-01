import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Modal, message } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { RawatInap } from "./RawatInap";
import { useHistory } from "react-router-dom";
import { url } from "../../../../util/endpoints";
import { useSelector } from "react-redux";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const getDoctorId = () => {
  const doctorId = sessionStorage.getItem("id");
  return doctorId ? doctorId : "";
};

export const Penanganan = (props) => {
  const [penanganan, setPenanaganan] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState({});

  const detailBio = useSelector((state) => state.records.detailBio);

  const history = useHistory();

  useEffect(() => {
    const doctorId = getDoctorId();
    setDoctorId(doctorId);
  }, []);

  const [form] = Form.useForm();
  let { id } = useParams();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setConfirmLoading(true);
    // sendData();
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    //   message.success("Rekam medis berhasil diproses");
    // }, 3000);
    // setConfirmLoading(false);
  };

  const sendData = () => {
    console.log(JSON.stringify(modalText));
    axios({
      method: "post",
      url: `${url.prod}/doctor/penanganan/insert`,
      data: modalText,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        message.success(result.data.message);
        history.replace("/rekam-medis");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    //   Handle submit to server
    const dateIn = moment(values.tanggal_masuk).format("D MMMM YYYY, h:mm:ss");
    const dateOut = moment(values.tanggal_keluar).format(
      "D MMMM YYYY, h:mm:ss"
    );
    values.tanggal_masuk = dateIn;
    values.tanggal_keluar = dateOut;

    let data = {
      rekam_medis_id: id,
      bpm: values.bpm ? values.bpm : "",
      kesimpulan: values.kesimpulan ? values.kesimpulan : "",
      saran: values.saran ? values.saran : "",
    };

    setModalText(null);
    setModalText(data);

    setTimeout(() => {
      showModal();
    }, 1000);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onPenanganan = (values) => {
    setPenanaganan(values);
  };

  let rawatInap = "";

  console.log(process.env.REACT_APP_KENDO_UI_LICENSE);

  rawatInap = [
    <Modal
      title="Penanganan"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={1000}
      footer={[
        
      ]}
    >
      <RawatInap detail={modalText} pasien={detailBio} />
    </Modal>,
  ];

  return (
    <div>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="spo2"
          label="Ket. Spo2"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="bpm"
          label="Ket. Bpm"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="kesimpulan"
          label="Kesimpulan"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="saran"
          label="Saran"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {rawatInap.length === 0 ? "" : rawatInap}

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Proses
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
