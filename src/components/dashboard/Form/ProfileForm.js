import React from "react";
import { Form, Input, Button, Select } from "antd";

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

export const ProfileForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ width: "60%" }}
    >
      <Form.Item
        name="name"
        label="Nama"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="email"
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
        <Input />
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
        name="jenis_kelamin"
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
