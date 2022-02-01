import React, { useState,  useEffect } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { Select, Skeleton, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { rekamMedisActions } from "./rekam-medis-slice";
import { getLastMonitoringCode, getSensorDataById } from "./api";
import GoogleMap from "../Maps/GoogleMap";
import { GeoCodeMarker } from "../Maps/GeoCodeMarker";

const { Option } = Select;

export const Sensors = (props) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  
  const chart = useSelector((state) => state.records.chartData);
  const monitoringCode = useSelector((state) => state.records.monitoringCode);
  const loadingChart = useSelector((state) => state.records.loadingChart);
  const detailBio = useSelector((state) => state.records.detailBio);

  useEffect(() => {
    dispatch(getLastMonitoringCode(id));
  }, [dispatch, id]);

  

  const options = {
    chartOptions: {
      chart: {
        height: 350,
        type: "area",
        stacked: false,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: chart.date,
        title: {
          text: "waktu",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        title: {
          text: "Spo2 & Bpm",
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  function handleChange(value) {
    dispatch(getSensorDataById(value));
  }

  const onChildClickCallback = (key) => {
    console.log(key);
  }

  const defaultProps = {
    center: {
      lat: -8.33562350780472,
      lng: 114.26583566963781,
    },
    zoom: 11,
  };

  return (
    <div className="Area">
      {monitoringCode ? (
        <div>
          <div style={{ display: "flex", height: '300px', width: '100%', marginBottom: '50px' }}>
            <div>
              <h4>Data Monitoring</h4>
              <Select style={{ width: 220 }} onChange={handleChange}>
                {monitoringCode.map((code, index) => (
                  <Option key={code} value={code}>
                    Monitoring ke - {code}
                  </Option>
                ))}
              </Select>
            </div>
            <div style={{ marginLeft: "30px", width: '100%', height: '100%'}}>
              <h4>Lokasi Monitoring</h4>
                <GoogleMap
                  defaultZoom={10}
                  defaultCenter={defaultProps.center}
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API,
                  }}
                  onChildClick={onChildClickCallback}
                >
                  <GeoCodeMarker
                    key={detailBio.id}
                    lat={detailBio.latitude}
                    lng={detailBio.longitude}
                    show={true}
                    patient={detailBio}
                  />
                </GoogleMap>
            </div>
          </div>
          {loadingChart === true ? (
            <Spin
              style={{ height: "350px", width: "650px", textAlign: "center" }}
            />
          ) : (
            <Chart
              options={options.chartOptions}
              series={chart.series}
              type="area"
              height={300}
              width={650}
            />
          )}
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};
