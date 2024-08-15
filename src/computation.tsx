import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Slider } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const MethodCompPanel: React.FC = () => {
  return (
    <div className="panel-content">
      <h2>Reinventing the Row</h2>
      <hr></hr>
      <div className="reinventing-row-content">
        <img
          src="daylight_legend.png"
          alt="Daylight Legend"
          id="daylight-legend"
        />
        <img src="shaft_lighting.png" alt="Light Well Daylight" width="300" />

        <div className="">
          <p>
            Most of New York's blocks are packed tight with row homes and
            buildings. They are constrained to relatively narrow parcels,
            resulting in little exposure to light and air.
          </p>
          <br></br>
          <strong>
            "Someone had the bright idea of carving away at the sides of the
            building – the windowless lot-line walls – to create air shafts that
            were ambitiously called "light courts." This idea was enshrined in
            1879 in what has become known as the Old Tenement Law, which
            required that every room have a window to the outside, even if it
            was only in one of those narrow shafts." [3]
          </strong>
          <br></br>
          <br></br>
          <p>
            Here we a typical shaft from a Ridgewood row house analyzed for
            year-round daylight hours, which shows us just how poorly they
            perform as vehicles for light into the building.
          </p>
        </div>
      </div>
    </div>
  );
};

export const DesignSpaceExplorer: React.FC = () => {
  const designOptions = [
    {
      name: "Standard",
      img: "lightWell0.png",
    },
    {
      name: "Trapezoid",
      img: "lightWell1.png",
    },
    {
      name: "Open Back",
      img: "lightWell4.png",
    },
    {
      name: "Pyramidal",
      img: "lightWell2.png",
    },
    {
      name: "Funnel",
      img: "lightWell3.png",
    },
  ];

  const [designOption, setDesignOption] = useState<number>(0);

  return (
    <div className="panel-content" id="design-option-container">
      <h2>Who said shafts walls need to be vertical?</h2>
      <img
        style={{
          flexGrow: 1,
          flexShrink: 1,
          maxHeight: "90%",
        }}
        src={designOptions[designOption].img}
        alt={`Design Option ${designOption + 1}`}
      />
      <Slider
        id="design-option-slider"
        value={designOption}
        onChange={(e, newValue) => setDesignOption(newValue as number)}
        min={0}
        max={designOptions.length - 1}
        step={1}
        marks
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => designOptions[value].name}
      />
      <h4>{designOptions[designOption].name}</h4>
    </div>
  );
};

export const UrbanMetricPanel: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const modelViewerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current as any;
    if (progress > 0.2) {
      modelViewer.play({ repetitions: 1 });
    }
  });

  return (
    <div className="panel-content" ref={containerRef} id="urban-metric-panel">
      <h2>Creating an urban scale metric</h2>
      <div className="model-viewer-container">
        {/* @ts-ignore */}
        <model-viewer
          ref={modelViewerRef}
          alt="Buildings"
          src="light_wells.gltf"
          style={{ width: "100%", height: "100%" }}
          exposure="1"
          shadow-softness="0.5"
          // camera-orbit="-10deg 30deg 3000m"
          camera-orbit={`${progress * 360}deg 20deg 3000m`}
        >
          <div
            slot="hotspot-1"
            data-surface="1 0 130 133 138 0.489 0.306 0.204"
          >
            <div className="hotspot">
              <p>Algorithmically Computed Light Well Areas</p>
            </div>
          </div>
          {/* @ts-ignore */}
        </model-viewer>
      </div>
      <h5>
        In order to draw correlations between the effects of poor lighting and
        other urban metrics, I created an algorithm in Grasshopper to compute
        the ratio of light well area to building footprint area using NYC Open
        Data [4].
      </h5>
      <h5>
        Because it would be too computationally costly to perform the detailed
        luminance analysis, especially since window geometry is not readily
        available at the urban scale, proxies become an essential tool for
        studying large areas.
      </h5>
    </div>
  );
};

export const GrumpinessPanel: React.FC = () => {
  const [geoData, setGeoData] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  useEffect(() => {
    fetch("light_wells.geojson")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error loading geoData:", error));
  }, []);

  const interpolateColor = (ratio) => {
    const startColor = [201, 221, 189]; // c9ddbd
    const endColor = [71, 249, 255]; // 47f9ff
    const interpolatedColor = startColor.map((start, index) =>
      Math.round(start + (endColor[index] - start) * ratio)
    );
    return `rgb(${interpolatedColor.join(",")})`;
  };

  const onEachFeature = (feature, layer) => {
    const ratio = feature.properties["Well to Building Ratio"];
    const color = interpolateColor(ratio);

    layer.setStyle({
      weight: 2,
      color: color,
      fillOpacity: 0.2,
    });

    layer.on({
      mouseover: (e) => {
        setHoveredRegion(feature.properties);
        e.target.setStyle({
          weight: 5,
          color: "#47f9ff",
          fillOpacity: 0.7,
        });
        const tooltip = L.tooltip({
          sticky: true,
        })
          .setContent(
            `
            <div>
              <h3>BBL: ${feature.properties.BBL}</h3>
              <h4>Num Floors: ${feature.properties.NumFloors}</h4>
              <h5>Well to Building Ratio: ${(
                feature.properties["Well to Building Ratio"] * 100
              ).toFixed(2)}%</h5>
            </div>
          `
          )
          .setLatLng(e.latlng);
        e.target.bindTooltip(tooltip).openTooltip();
      },
      mouseout: (e) => {
        setHoveredRegion(null);
        e.target.setStyle({
          weight: 2,
          color: color,
          fillOpacity: 0.2,
        });
        e.target.unbindTooltip();
      },
    });
  };

  if (!geoData) {
    return <div>Loading...</div>;
  }
  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw", cursor: "default" }}
      center={[40.7, -73.9]} // Coordinates for Ridgewood, New York
      zoom={15}
      dragging={true}
      zoomControl={true}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <GeoJSON data={geoData} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};
