import React, { useRef, useState, useEffect } from "react";
// import H from "@here/maps-api-for-javascript";
import "./kontakPasien.css";
import axios from "axios";
import {url} from '../../../util/endpoints';

export const KontakPasienMap = (props) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState({ maps: null });

  // useEffect(() => {
  //   axios
  //     .get(`${url.prod}/doctor/patient/contact?id=${props.patientId}`)
  //     .then((res) => {
  //       let location = "";

  //       location = res.data.data;

  //       const platform = new H.service.Platform({
  //         apikey: "av0Ttdg16tP9K8FkILYTYscMzPzWExqyJTO3N05RJwM",
  //       });

  //       const defaultLayers = platform.createDefaultLayers();

  //       let service = platform.getSearchService();

  //       for (const key in location) {
  //         service.reverseGeocode(
  //           {
  //             at: `${location[key].latitude},${location[key].longitude}`,
  //           },
  //           (result) => {
  //             result.items.forEach((item) => {
  //               ui.addBubble(
  //                 new H.ui.InfoBubble(item.position, {
  //                   content: `Nama: ${location[key].name}, Alamat: ${item.address.label}`,
  //                 })
  //               );
  //             });
  //           }
  //         );
  //       }

  //       // Create an instance of the map
  //       const patientMap = new H.Map(
  //         mapRef.current,
  //         defaultLayers.vector.normal.map,
  //         {
  //           center: { lat: -8.459048035289157, lng: 114.25965552010263 },
  //           zoom: 9,
  //           pixelRatio: window.devicePixelRatio || 1,
  //         }
  //       );

  //       const behavior = new H.mapevents.Behavior(
  //         new H.mapevents.MapEvents(patientMap)
  //       );

  //       const ui = H.ui.UI.createDefault(patientMap, defaultLayers);

  //       let mapSettings = ui.getControl("mapsettings");
  //       let zoom = ui.getControl("zoom");
  //       let scalebar = ui.getControl("scalebar");

  //       mapSettings.setAlignment("top-left");
  //       zoom.setAlignment("top-left");
  //       scalebar.setAlignment("top-left");

  //       setMapInstance({ maps: patientMap });
  //     });

  //   return setMapInstance({ maps: null });
  // }, [mapRef, props.patientId]);

  return <div className="contact-detail-patient"></div>;
};
