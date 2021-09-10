import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  DatePicker,
  Modal,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { IsolasiMandiri } from "./IsolasiMandiri";
import { RawatInap } from "./RawatInap";
import { useHistory } from "react-router-dom";

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
    setConfirmLoading(true);
    sendData();
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    //   message.success("Rekam medis berhasil diproses");
    // }, 3000);
    setConfirmLoading(false);
  };

  const sendData = () => {
    console.log(JSON.stringify(modalText));
    axios({
      method: "post",
      url: `http://localhost:8000/doctor/penanganan/insert`,
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
      diagnosa: values.diagnosa ? values.diagnosa : "",
      oksigen: values.oksigen ? values.oksigen : "",
      ruangan: values.ruangan ? values.ruangan : "",
      saran: values.saran ? values.saran : "",
      tanggal_keluar: values.tanggal_keluar ? values.tanggal_keluar : "",
      tanggal_masuk: values.tanggal_masuk ? values.tanggal_masuk : "",
      tindakan: values.tindakan ? values.tindakan : "",
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

  if (penanganan === "Isolasi Mandiri") {
    rawatInap = [
      <Form.Item
        name="saran"
        label="Saran ke pasien"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>,

      <Modal
        title="Penanganan"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Batal
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Proses
          </Button>,
        ]}
      >
        <IsolasiMandiri detail={modalText} pasien={props.pasien} />
      </Modal>,
    ];
  }

  if (penanganan === "Rawat Inap") {
    rawatInap = [
      <Modal
        title="Penanganan"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Batal
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Proses
          </Button>,
        ]}
      >
        <RawatInap detail={modalText} pasien={props.pasien} />
      </Modal>,

      <Form.Item
        name="tanggal_masuk"
        label="Tanggal Masuk"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>,

      <Form.Item
        name="tanggal_keluar"
        label="Tanggal Keluar"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>,

      <Form.Item
        name="ruangan"
        label="Ruangan"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Ruang Inap" allowClear>
          {/* looping ruangan */}
          <Option value="A-15">A-15</Option>
          <Option value="A-12">A-12</Option>
        </Select>
      </Form.Item>,

      <Form.Item
        name="oksigen"
        label="Beri tabung Oksigen"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          min={1}
          max={10}
          initialValue={1}
          style={{ width: "100%" }}
        />
      </Form.Item>,

      <Form.Item
        name="saran"
        label="Saran ke Pasien"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>,
    ];
  }

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
          name="diagnosa"
          label="Diagnosa"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tindakan"
          label="Tindak Lanjut"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Tindak Lanjut penanganan pasien"
            allowClear
            onChange={onPenanganan}
          >
            <Option value="Isolasi Mandiri">Isolasi Mandiri</Option>
            <Option value="Rawat Inap">Rawat Inap</Option>
          </Select>
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
