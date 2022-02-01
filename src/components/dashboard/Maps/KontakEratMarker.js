import React from "react";

// InfoWindow component
export const InfoWindow = (props) => {
  const { contact } = props;
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

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{contact.name}</div>
      <div style={{ fontSize: 14, color: "grey" }}>{contact.address}</div>
    </div>
  );
};

// Marker component
export const KontakEratMarker = ({ show, contact }) => {
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
      {show && <InfoWindow contact={contact} />}
    </>
  );
};
