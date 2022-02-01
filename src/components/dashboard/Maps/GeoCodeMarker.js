import React, { useState, useEffect } from "react";

export const fetchGeoCode = (lat, lng) => {
  const fetchData = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDFxk7pvFBDdyXU30zjjjMo2h5wqovB308`
    );

    if (!response.ok) {
      console.log(response);
    }

    const data = response.json();

    return data;
  };

  try {
    const responseData = fetchData();
    return responseData;
  } catch (error) {}
};

// InfoWindow component
export const InfoWindow = (props) => {
  const [address, setAddress] = useState();
  const { lat, lng } = props;
  
  const infoWindowStyle = {
    position: "relative",
    bottom: 120,
    left: "-45px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  useEffect(() => {
    fetchGeoCode(lat, lng).then((result) => {
      setAddress(result.results[0].formatted_address);
    });
  }, [lat, lng]);

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 14, color: "grey" }}>
        {address ? address : ""}
      </div>
    </div>
  );
};

// Marker component
export const GeoCodeMarker = ({ show, patient, lat, lng }) => {
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 20,
    width: 20,
    backgroundColor: show ? "red" : "blue",
    cursor: "pointer",
    zIndex: 10,
  };

  return (
    <>
      <div style={markerStyle} />
      {show && <InfoWindow patient={patient} lat={lat} lng={lng} />}
    </>
  );
};
