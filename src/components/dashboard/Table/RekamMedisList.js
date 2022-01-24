import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Tag,
  Skeleton,
  Popconfirm,
  message,
  Card,
} from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./rekam-medis-list.css";
import axios from "axios";
import {url} from '../../../util/endpoints'

let searchInput = "";

export const RekamMedisList = () => {
  const [medicalRecords, setMedicalRecords] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setDelete] = useState();

  useEffect(() => {
    getRecordList();
  }, []);

  const getRecordList = () => {
    axios({
      method: "get",
      url: `${url.prod}/doctor/patient/records`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setMedicalRecords(result.data.records);
        setIsLoading(!isLoading);
      })
      .catch(() => {});
  };

  let patientRecord = [];

  if (medicalRecords !== undefined) {
    for (const i in medicalRecords) {
      // apakah pasien punya rekam medis?
      let isMedicalRecordExist = medicalRecords[i].medicalRecord.length !== 0;

      for (const j in medicalRecords[i].medicalRecord) {
        if (isMedicalRecordExist) {
          patientRecord.push({
            key: medicalRecords[i].medicalRecord[j].id,
            idRecord: medicalRecords[i].medicalRecord[j].id,
            name: medicalRecords[i].name,
            age: "20",
            address: medicalRecords[i].alamat,
            spo2: medicalRecords[i].medicalRecord[j].averrage_spo2,
            bpm: medicalRecords[i].medicalRecord[j].averrage_bpm,
            konfirmasi: medicalRecords[i].medicalRecord[j].konfirmasi,
          });
        }
      }
    }
  }

  const [search, setSearch] = useState({
    searchText: "",
    searchedColumn: "",
  });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearch({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // handle search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  // reset Search
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearch({ searchText: "" });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "idRecord",
      key: "idRecord",
      width: "5%",
      ...getColumnSearchProps("idRecord"),
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      width: "22%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Umur",
      dataIndex: "age",
      key: "age",
      width: "6%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Alamat",
      dataIndex: "address",
      key: "address",
      width: "12%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Spo2",
      dataIndex: "spo2",
      key: "spo2",
      width: "6%",
      ...getColumnSearchProps("spo2"),
    },
    {
      title: "BPM",
      dataIndex: "bpm",
      key: "bpm",
      width: "6%",
      ...getColumnSearchProps("bpm"),
    },
    {
      title: "Konfirmasi",
      dataIndex: "konfirmasi",
      key: "konfirmasi",
      width: "15%",
      ...getColumnSearchProps("konfirmasi"),
    },
    {
      title: "Aksi",
      dataIndex: "idRecord",
      key: "action",
      width: "30%",
      render: (id, record) => (
        <Space size="middle">
          <Link to={`/rekam-medis/${id}`}>
            <Tag color="blue">Proses</Tag>
          </Link>
          <Popconfirm
            title="Hapus Rekam Medis ini?"
            onConfirm={() => {
              confirm(id);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Tag color="red" style={{ cursor: "pointer" }}>
              Hapus
            </Tag>
          </Popconfirm>
          {/* <Link to={`/rekam-medis/${id}`}>
            <Tag color="orange">Detail</Tag>
          </Link> */}
        </Space>
      ),
    },
  ];

  const confirm = (id) => {
    axios({
      method: "delete",
      url: `${url.prod}/doctor/record/delete?id=${id}`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setDelete(true);
      })
      .catch(() => {});
    message.success("Rekam Medis berhasil dihapus");
    getRecordList();
  };

  const cancel = (e) => {
    message.error("Hapus rekam medis dibatalkan");
  };

  return (
    <div>
      {isLoading ? (
        <Card>
          <Skeleton />
        </Card>
      ) : (
        <Card>
            <Table style={{width: '100%'}} columns={columns} dataSource={patientRecord} />
        </Card>
      )}
    </div>
  );
};
