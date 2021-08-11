import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";

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

export const Penanganan = () => {
  const [penanganan, setPenanaganan] = useState("");
  const [form] = Form.useForm();

  const onFinish = (values) => {
    //   Handle submit to server
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onPenanganan = (values) => {
    setPenanaganan(values);
  };

  let rawatInap = "";

  if (penanganan === "isoma") {
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
    ];
  }

  if (penanganan === "inap") {
    rawatInap = [
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
          defaultValue={1}
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
          <Option value="isoma">Isolasi Mandiri</Option>
          <Option value="inap">Rawat Inap</Option>
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
  );
};
