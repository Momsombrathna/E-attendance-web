import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapPicker({ lat, lon, zoom, radius }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([lat, lon], zoom || 18);

    // Change the tile layer to a different style
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution: "E-Attendance",
    }).addTo(map);

    // Use a custom marker icon
    const customIcon = L.icon({
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      shadowSize: [41, 41],
    });

    const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

    const circle = L.circle([lat, lon], {
      color: "#3388ff",
      fillColor: "#3388ff",
      fillOpacity: 0.2,
      radius: radius * 1000,
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lon, zoom, radius]);

  return (
    <div
      ref={mapRef}
      style={{ height: "400px", width: "100%", borderRadius: "5px" }}
    />
  );
}

export default MapPicker;
