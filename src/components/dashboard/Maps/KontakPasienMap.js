import React, { useRef, useState, useEffect } from "react";
import H from "@here/maps-api-for-javascript";
import "./kontakPasien.css";

export const KontakPasienMap = () => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState({ maps: null });

  useEffect(() => {
    const platform = new H.service.Platform({
      apikey: "av0Ttdg16tP9K8FkILYTYscMzPzWExqyJTO3N05RJwM",
    });

    const defaultLayers = platform.createDefaultLayers();

    // Get an instance of the search service:
    let service = platform.getSearchService();
    // Call the reverse geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    service.reverseGeocode(
      {
        at: "-8.459048035289157,114.25965552010263",
      },
      (result) => {
        console.log(result);
        result.items.forEach((item) => {
          // Assumption: ui is instantiated
          // Create an InfoBubble at the returned location with
          // the address as its contents:
          ui.addBubble(
            new H.ui.InfoBubble(item.position, {
              content: item.address.label,
            })
          );
        });
      },
      alert
    );

    // Create an instance of the map
    const contacttMap = new H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: -8.459048035289157, lng: 114.25965552010263 },
        zoom: 9,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(contacttMap)
    );

    const ui = H.ui.UI.createDefault(contacttMap, defaultLayers);

    setMapInstance({ maps: contacttMap });

    return setMapInstance({ maps: null });
  }, [mapRef]);

  return <div ref={mapRef} className="contact-detail-patient"></div>;
};
