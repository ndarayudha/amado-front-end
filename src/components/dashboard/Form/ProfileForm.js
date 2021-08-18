import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

const getToken = () => {
  const storedToken = sessionStorage.getItem("token");
  return storedToken ? storedToken : "";
};

export const ProfileForm = (props) => {
  const [form] = Form.useForm();
  const [token, setToken] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const tokenBearer = getToken();
    setToken(tokenBearer);
  }, []);

  const onFinish = (values) => {
    let body = values;
    body.tanggal_lahir = values.tanggal_lahir.format("DD MMMM YYYY");

    axios({
      method: "post",
      url: `http://localhost:8000/doctor/update/`,
      headers: { Authorization: `Bearer ${token}` },
      data: body,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setInfo(result.data.message);
        console.log(result.data.message);
        message.success(result.data.message);
      })
      .catch(() => {
        message.error("Pastikan data telah diisi dengan benar");
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      initialValues={{
        name: `${props.biodata.name}`,
        email: `${props.biodata.email}`,
        jenis_kelamin: `${props.biodata.jenis_kelamin}`,
        tanggal_lahir: props.biodata.tanggal_lahir
          ? moment(props.biodata.tanggal_lahir)
          : "",
        phone: `${props.biodata.phone}`,
        address: `${props.biodata.address}`,
        specialist: `${props.biodata.specialist}`,
        hospital: `${props.biodata.hospital}`,
      }}
      onFinish={onFinish}
      style={{ width: "60%" }}
    >
      <Form.Item name="name" label="Nama">
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="jenis_kelamin"
        label="Jenis Kelamin"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Jenis Kelamin" allowClear>
          <Option value="Laki - Laki">Laki - Laki</Option>
          <Option value="Perempuan">Perempuan</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phone"
        label="No. Hp"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tanggal_lahir"
        label="Tanggal Lahir"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="address"
        label="Alamat"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="specialist"
        label="Spesialis"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Tambahkan spesialisasi anda" allowClear>
          <Option value="1">Spesialis Jantung</Option>
          <Option value="2">Spesialis Bedah</Option>
          <Option value="3">Spesialis Organ Dalam</Option>
          <Option value="4">Spesialis Kulit</Option>
          <Option value="5">Spesialis Mata</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="hospital"
        label="Tempat Rumah Sakit"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Tambahkan rumah sakit anda bekerja" allowClear>
          <Option value="1">RS A</Option>
          <Option value="2">RS B</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "20px" }}
        >
          Update
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
