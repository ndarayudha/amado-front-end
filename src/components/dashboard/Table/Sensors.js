import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { url } from "../../../util/endpoints";
import { Select } from "antd";

const { Option } = Select;

export const Sensors = (props) => {
  const [dataSensor, setDataSensor] = useState();

  const options = {
    series: [
      {
        name: "Spo2",
        data: [],
      },
      {
        name: "Bpm",
        data: [],
      },
    ],
    chartOptions: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${url.prod}/doctor/patient/pulse?id=${props.patientId}`,
    })
      .then((response) => {
        return response;
      })
      .then((result) => {
        setDataSensor(result.data.data);
      })
      .catch(() => {});
  }, [props.patientId]);

  if (dataSensor !== undefined) {
    for (let j = 0; j < dataSensor.length; j++) {
      options.series[0].data.push(parseInt(dataSensor[j].spo2));
      options.series[1].data.push(parseInt(dataSensor[j].bpm));
      options.chartOptions.xaxis.categories.push(dataSensor[j].created_at);
    }
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className="Area">
      <Select
        defaultValue="lucy"
        style={{ width: 220 }}
        onChange={handleChange}
      >
        <Option value="1">Monitoring ke - 1</Option>
        <Option value="2">Monitoring ke - 2</Option>
        <Option value="3">Monitoring ke - 3</Option>
      </Select>
      <Chart
        options={options.chartOptions}
        series={options.series}
        type="area"
        height={300}
        width={650}
      />
    </div>
  );
};
