import React, { useEffect, useState } from "react";
import "./kontakPasien.css";
import GoogleMap from "./GoogleMap";
import { useDispatch, useSelector } from "react-redux";
import { getCloseContactPatient } from "../Table/api";
import { useParams } from "react-router-dom";
import { KontakEratMarker } from "./KontakEratMarker";
import { Skeleton } from "antd";
import { rekamMedisActions } from "../Table/rekam-medis-slice";

const defaultProps = {
  center: {
    lat: -8.33562350780472,
    lng: 114.26583566963781,
  },
  zoom: 11,
};

export const KontakPasienMap = (props) => {
  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const closeContacts = useSelector((state) => state.records.closeContacts);

  console.log(closeContacts);

  useEffect(() => {
    dispatch(getCloseContactPatient(id));
  }, [dispatch, id]);

  const onChildClickCallback = (key) => {
    const currentCloseContact = [...closeContacts];
    const index = currentCloseContact.findIndex((e) => e.id === +key);
    const closeContactDetail = { ...currentCloseContact[index] };

    closeContactDetail.show = !currentCloseContact.show;

    currentCloseContact[index] = closeContactDetail;

    // dispatch(
    //   rekamMedisActions.setCloseContacts({
    //     closeContacts: currentCloseContact,
    //   })
    // );
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <h4>Lokasi Kontak Erat</h4>
        {closeContacts ? (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={defaultProps.center}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API,
            }}
            onChildClick={onChildClickCallback}
          >
            {closeContacts.map((contact) => (
              <KontakEratMarker
                key={contact.id}
                lat={contact.latitude}
                lng={contact.longitude}
                show={contact.show}
                contact={contact}
              />
            ))}
          </GoogleMap>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};
