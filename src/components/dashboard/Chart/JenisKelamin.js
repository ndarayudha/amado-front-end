import React, { useState } from "react";
import Chart from "react-apexcharts";

export const JenisKelamin = (props) => {
  const [options, setOptons] = useState({
    chartOptions: {
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val) {
          return val;
        },
        offsetX: 100,
        offsetY: 200,
      },
      chart: {
        type: "donut",
        width: 300,
        height: 300,
      },

      labels: ["Laki Laki", "Perempuan"],
    },
    series: [60, 40],
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
