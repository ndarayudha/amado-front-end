import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Nama Pasien",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 3,
    },
  },
  {
    title: "Lokasi Terbaru",
    dataIndex: "lokasi",
    sorter: {
      compare: (a, b) => a.lokasi - b.lokasi,
      multiple: 2,
    },
  },
  {
    title: "Waktu Monitoring",
    dataIndex: "waktu",
    sorter: {
      compare: (a, b) => a.waktu - b.waktu,
      multiple: 1,
    },
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    status: 98,
    lokasi: 60,
    waktu: 70,
  },
  {
    key: "2",
    name: "Jim Green",
    status: 98,
    lokasi: 66,
    waktu: 89,
  },
  {
    key: "3",
    name: "Joe Black",
    status: 98,
    lokasi: 90,
    waktu: 70,
  },
  {
    key: "4",
    name: "Jim Red",
    status: 88,
    lokasi: 99,
    waktu: 89,
  },
];

export const CurrentMonitoringList = () => {
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div>
      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};
