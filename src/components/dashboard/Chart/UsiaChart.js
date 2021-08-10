import React, { useState } from "react";
import Chart from "react-apexcharts";

export const UsiaChart = (props) => {
  const [options, setOptons] = useState({
    chartOptions: {
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val) {
          return val.toFixed(0);
        },
        offsetX: 100,
        offsetY: 200,
      },
      chart: {
        type: "donut",
      },
      labels: ["12 - 19", "20- 25", "26 - 50", ">50"],
    },
    series: [10, 20, 30, 30],
  });

  return (
    <div className="donut">
      <Chart
        options={options.chartOptions}
        series={options.series}
        type="donut"
        width="250"
      />
    </div>
  );
};
