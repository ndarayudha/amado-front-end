import React, { useRef, useState, useEffect } from "react";
import H from "@here/maps-api-for-javascript";

export const DetailMap = (props) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState({ maps: null });

  const coords = { lat: -8.459048035289157, lng: 114.25965552010263 };

  const showAddress = (searchService, ui, lat, lon) => {
    searchService.reverseGeocode(
      {
        at: `${lat},${lon}`,
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
      }
    );
  };

  let svgMarkup =
    '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">N</text></svg>';

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

    // Create an instance of the map
    const detailPatientMap = new H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: coords,
        zoom: 15,
        pixelRatio: window.devicePixelRatio || 2,
      }
    );

    // Create an icon, an object holding the latitude and longitude, and a marker:
    let icon = new H.map.Icon(svgMarkup);
    let marker = new H.map.Marker(coords, { icon: icon });

    // add object marker
    detailPatientMap.addObject(marker);

    // Setup Map Behavior
    const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(detailPatientMap)
    );

    const ui = H.ui.UI.createDefault(detailPatientMap, defaultLayers);

    // Listener Click Map
    detailPatientMap.addEventListener("tap", function (evt) {
      showAddress(service, ui, evt.target.b.lat, evt.target.b.lng);
    });

    setMapInstance({ maps: detailPatientMap });

    return setMapInstance({ maps: null });
  }, []);

  return (
    <div
      key="map-detail"
      ref={mapRef}
      className="contact-all-map"
      id="contact-map-container"
    ></div>
  );
};
