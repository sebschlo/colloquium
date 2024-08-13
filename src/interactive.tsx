import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

export const ZinePanel: React.FC = () => {
  return (
    <div className="content">
      <h2>The Trolley Problem</h2>
      <h3>A Zine on Generative AI</h3>
      <a
        href="/zine.html"
        style={{ position: "relative", display: "inline-block" }}
      >
        <img
          src="TrainBG.png"
          style={{ transition: "box-shadow 0.3s" }}
          alt="Train Background"
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3.1rem",
            color: "rgb(255, 255, 255)",
            textShadow: "2px 2px 40px rgba(0, 0, 0, 0.9)",
            backgroundColor: "black",
            padding: "10px",
          }}
        >
          Click to Play
        </span>
      </a>
    </div>
  );
};

export const PredictiveMap = () => {
  const [predictions, setPredictions] = useState([]);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    try {
      const response = await fetch(
        "https://cdp-ml-map-backend-2d3eda9f2236.herokuapp.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lat, lon: lng }),
        }
      );
      const data = await response.json();
      const { endLat, endLon } = data;
      console.log("prediction", endLat, endLon);
      setPredictions((prev) => [
        ...prev,
        { startPoint: [lat, lng], endPoint: [endLat, endLon] },
      ]);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          padding: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <h2>AI Is One Step Ahead of You</h2>
        <hr></hr>
        <br></br>
        <h5>
          Click on the map to set a starting point and observe the predicted
          destination based on an ML model trained on years of my Google
          Timeline data.
        </h5>
      </div>
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={12}
        style={{ height: "100vh", width: "100%" }}
        dragging={true}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapEvents />
        {predictions.map((prediction, index) => (
          <React.Fragment key={index}>
            <Marker
              position={prediction.startPoint}
              icon={L.divIcon({
                className: "custom-icon",
                html: '<div style="background-color: grey; width: 12px; height: 12px; border-radius: 50%;"></div>',
              })}
            />
            <Marker
              position={prediction.endPoint}
              icon={L.divIcon({
                className: "custom-icon",
                html: '<div style="background-color: #47f9ff; width: 12px; height: 12px; border-radius: 50%;"></div>',
              })}
            />
            <Polyline
              positions={[prediction.startPoint, prediction.endPoint]}
              pathOptions={{ color: "lightgrey" }}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};
