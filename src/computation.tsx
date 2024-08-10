import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Slider } from "@mui/material";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const MethodCompIntroPanel: React.FC<{ title: string }> = ({
  title,
}) => {
  return (
    <div>
      <h3 className="highlighted">Method B</h3>
      <blockquote>Design Computation and Visual Storytelling</blockquote>
    </div>
  );
};

export const MethodCompPanel: React.FC = () => {
  return (
    <div>
      <h1>Reinventing the Row</h1>
      <hr></hr>
      <div className="cont-layout">
        <div className="cont-half">
          <img src="shaft_lighting.png" alt="Light Well Daylight" width="300" />
        </div>
        <div className="cont-half ">
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
            was only in one of those narrow shafts." [1]
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
      img: "public/lightWell0.png",
    },
    {
      name: "Trapezoid",
      img: "public/lightWell1.png",
    },
    {
      name: "Pyramidal",
      img: "public/lightWell2.png",
    },
    {
      name: "Funnel",
      img: "public/lightWell3.png",
    },
    {
      name: "Open Back",
      img: "public/lightWell4.png",
    },
  ];

  const [designOption, setDesignOption] = useState<number>(0);

  return (
    <div id="design-option-container">
      <h2>Parametric Well Design</h2>
      <img
        style={{ marginTop: "50px" }}
        src={designOptions[designOption].img}
        alt={`Design Option ${designOption + 1}`}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
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
      </div>
      <h3>{designOptions[designOption].name}</h3>
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
    <div id="algo-panel-content" ref={containerRef}>
      <h2>Creating an urban scale metric</h2>
      <div className="model-viewer-container">
        {/* @ts-ignore */}
        <model-viewer
          ref={modelViewerRef}
          alt="Buildings"
          src="public/light_wells.gltf"
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
              <p>Algorithmically Comptued Light Well Areas</p>
            </div>
          </div>
          {/* @ts-ignore */}
        </model-viewer>
      </div>
      <p>
        In order to draw correlations between the effects of poor lighting and
        other urban metrics, I created an algorithm in Grasshopper to compute
        the ratio of light well area to building footprint area. This can serve
        as a proxy of much light is available to its residents.
      </p>
      <p>
        Because it would be too computationally costly to perform the detailed
        luminance analysis, especially since window geometry is not readily
        available at the urban scale, proxies become an essential tool for
        studying large areas.
      </p>
    </div>
  );
};
