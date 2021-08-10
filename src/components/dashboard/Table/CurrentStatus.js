import React, { useState } from "react";
import { Card } from "antd";
import Chart from "react-apexcharts";

export const CurrentStatus = () => {
  const [options, setOptons] = useState({
    series: [
      {
        name: "Bergejala",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Sembuh",
        data: [11, 32, 45, 32, 34, 52, 41],
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
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  return (
    <div className="Area">
      <Chart
        options={options.chartOptions}
        series={options.series}
        type="area"
        height={300}
        width={500}
      />
    </div>
  );
};
