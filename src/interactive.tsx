import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import * as tf from "@tensorflow/tfjs";
import L from "leaflet";

export const ZinePanel: React.FC = () => {
  return (
    <div className="full">
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
  const [model, setModel] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  useEffect(() => {
    // Load the TensorFlow.js model
    const loadModel = async () => {
      const loadedModel = await tf.loadGraphModel("/tfjs_model/model.json");
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setStartPoint([lat, lng]);
    console.log("clicked! this is model: ", lat, lng);
    if (model) {
      const inputTensor = tf.tensor2d([[lat, lng]]);
      const prediction = model.predict(inputTensor);
      const [endLat, endLon] = prediction.dataSync();
      console.log("prediction", endLat, endLon);
      setEndPoint([endLat, endLon]);
    }
  };

  useEffect(() => {
    const map = L.map("map").setView([40.7128, -74.006], 12);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);

    map.on("click", handleMapClick);

    return () => {
      map.remove();
    };
  }, [model]);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};
