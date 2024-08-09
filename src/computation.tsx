import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const MethodCompPanel: React.FC = () => {
  return (
    <div>
      <h1>Method B</h1>
      <h2>Design Computation and Visual Storytelling</h2>
      <hr></hr>
      <div className="cont-layout">
        <div className="cont-half">
          <img src="shaft_lighting.png" alt="Light Well Daylight" width="300" />
        </div>
        <div className="cont-half">

          <br></br>
          <h3><strong>Reinventing the Row Home</strong></h3>
          <br></br>
          <p>
            Most of New York's blocks are packed tight with row homes and buildings. They are constrained to relatively narrow parcels, resulting in little exposure to light and air.
          </p>
          <br></br>
          <strong>"Someone had the bright idea of carving away at the sides of the building – the windowless lot-line walls – to create air shafts that were ambitiously called "light courts." This idea was enshrined in 1879 in what has become known as the Old Tenement Law, which required that every room have a window to the outside, even if it was only in one of those narrow shafts." [1]</strong>
          <br></br>
          <br></br>
          <p>
            Here we a typical shaft from a Ridgewood row house analyzed for year-round daylight hours, which shows us just how poorly they perform as vehicles for light into the building.
          </p>
        </div>
      </div>
    </div>
  )
}

export const UrbanMetricPanel: React.FC = () => {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    if (modelViewerRef.current) {
      const modelViewer = modelViewerRef.current as any;

      gsap.to(modelViewer, {
        scrollTrigger: {
          trigger: modelViewer,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            modelViewer.play({ repetitions: 1 });
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const rotation = progress * 120;
            modelViewer.setAttribute('camera-orbit', `${rotation}deg 20deg 3000m`);
          }
        }
      });

      modelViewer.addEventListener('click', (event: { clientX: number; clientY: number; }) => {
        const hotspotId = modelViewer.surfaceFromPoint(event.clientX, event.clientY);
        if (hotspotId) {
          console.log(`Hotspot ID: ${hotspotId}`);
        }
      });
    }
  }, []);

  return (
    <div className="model-viewer">
      <h1>Panel 1</h1>
      {/* @ts-ignore */}
      <model-viewer
        ref={modelViewerRef}
        alt="Buildings"
        src="public/light_wells.gltf"
        style={{ width: '100%', height: '100%' }}
        exposure="1"
        shadow-softness="0.5"
        camera-orbit="-10deg 30deg 3000m"
      >
        <div slot="hotspot-1" data-surface="1 0 130 133 138 0.489 0.306 0.204">
          <div className="hotspot">
            <p>Calculated Light Well Areas</p>
          </div>
        </div>
        {/* @ts-ignore */}
      </model-viewer>
    </div>
  )
}