import React, { useEffect } from "react";
import { Table } from "antd";
import { getCurrentPatient } from "../Content/statistik/api";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const columns = [
  {
    title: "Nama Pasien",
    dataIndex: "name",
  },
  {
    title: "Alamat",
    dataIndex: "alamat",
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 3,
    },
  },
  {
    title: "Tanggal Lahir",
    dataIndex: "tanggal_lahir",
    sorter: {
      compare: (a, b) => a.lokasi - b.lokasi,
      multiple: 2,
    },
  },
  {
    title: "Waktu Daftar",
    dataIndex: "created_at",
    sorter: {
      compare: (a, b) => a.waktu - b.waktu,
      multiple: 1,
    },
    render: (created_at) => (
      <>{moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</>
    ),
  },
];


export const CurrentMonitoringList = () => {
  const dispatch = useDispatch();
  const currentPatients = useSelector((state) => state.statistik.currentPatient);

  console.log(currentPatients);

  useEffect(() => {
    dispatch(getCurrentPatient());
  }, [dispatch]);

  
  return (
    <div>
      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={currentPatients}
      />
    </div>
  );
};
