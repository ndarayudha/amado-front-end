import React, { useRef, useState, useEffect } from "react";
import H from "@here/maps-api-for-javascript";
import "./lokasi-pasien.css";
import { Row, Col, Layout, Card } from "antd";
import axios from "axios";

export const LokasiPasien = (props) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState({ maps: null });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/doctor/geolocation/patient/all`)
      .then((res) => {
        let location = "";

        location = res.data.data;

        const platform = new H.service.Platform({
          apikey: "av0Ttdg16tP9K8FkILYTYscMzPzWExqyJTO3N05RJwM",
        });

        const defaultLayers = platform.createDefaultLayers();

        let service = platform.getSearchService();

        for (const key in location) {
          service.reverseGeocode(
            {
              at: `${location[key].latitude},${location[key].longitude}`,
            },
            (result) => {
              result.items.forEach((item) => {
                ui.addBubble(
                  new H.ui.InfoBubble(item.position, {
                    content: `Nama: ${location[key].name}, Alamat: ${item.address.label}`,
                  })
                );
              });
            }
          );
        }

        // Create an instance of the map
        const patientMap = new H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            center: { lat: -8.459048035289157, lng: 114.25965552010263 },
            zoom: 9,
            pixelRatio: window.devicePixelRatio || 1,
          }
        );

        const behavior = new H.mapevents.Behavior(
          new H.mapevents.MapEvents(patientMap)
        );

        const ui = H.ui.UI.createDefault(patientMap, defaultLayers);

        let mapSettings = ui.getControl("mapsettings");
        let zoom = ui.getControl("zoom");
        let scalebar = ui.getControl("scalebar");

        mapSettings.setAlignment("top-left");
        zoom.setAlignment("top-left");
        scalebar.setAlignment("top-left");

        setMapInstance({ maps: patientMap });
      });

    return setMapInstance({ maps: null });
  }, [mapRef]);

  return (
    <Layout>
      <Row
        gutter={16}
        justify="center"
        className="patient-map-stat"
        style={{ height: "100%" }}
        data-aos="fade-up"
      >
        <Col span={22}>
          <Card style={{ width: "100%" }}>
            <div
              ref={mapRef}
              className="patient-all-map"
              id="patient-map-container"
            ></div>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
