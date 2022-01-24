import React from "react";
import { Table, Tag, Space, Card, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

const columns = [
  {
    title: "Nama",
    dataIndex: "name",
    key: "name",
    width: "22%",
  },
  {
    title: "Umur",
    dataIndex: "tanggal_lahir",
    key: "tanggal_lahir",
    render: (tanggal_lahir) => (
      <>{moment().diff(moment(tanggal_lahir, "DD-MM-YYYY"), "years")}</>
    ),
  },
  {
    title: "Alamat",
    dataIndex: "alamat",
    width: "28%",
    key: "alamat",
  },
  {
    title: "Keterangan",
    key: "konfirmasi",
    dataIndex: "konfirmasi",
    render: (konfirmasi) => (
      <>
        {!konfirmasi ? (
          <Tag color="red" key={konfirmasi}>
            {"BELUM TERKONFIRMASI"}
          </Tag>
        ) : (
          <Tag color="green" key={konfirmasi}>
            {"SUDAH TERKONFIRMASI"}
          </Tag>
        )}
      </>
    ),
  },
  {
    title: "Aksi",
    key: "action",
    width: "30%",
    render: (text, record) => (
      <Space size="middle">
        <Link to={`/konfirmasi/${record.id}`}>
          <Tag color="blue">Konfirmasi {record.name} sekarang</Tag>
        </Link>
      </Space>
    ),
  },
];

export const KonfirmasiTabel = () => {
  const patients = useSelector((state) => state.konfirmasi.patients);

  console.log(patients);

  return (
    <Card>
      {!patients ? (
        <Skeleton active />
      ) : (
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={patients}
        />
      )}
    </Card>
  );
};
