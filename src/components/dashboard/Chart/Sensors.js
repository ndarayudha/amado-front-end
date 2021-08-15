import React, { useState } from "react";
import Chart from "react-apexcharts";

export const Sensors = () => {
  const [options, setOptons] = useState({
    series: [
      {
        name: "Spo2",
        data: [98, 99, 98, 99, 99, 99, 99],
      },
      {
        name: "Bpm",
        data: [60, 65, 62, 65, 63, 66, 66],
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
        width={650}
      />
    </div>
  );
};
