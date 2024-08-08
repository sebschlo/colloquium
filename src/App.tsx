import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function Scroll() {
  const modelViewerRef = useRef(null);
  const headerRef = useRef(null);

  const IntroPanel: React.FC = () => {
    return (
      <>
        <h1>Inverting Spatial Interfaces</h1>
        <h2>GSAPP CDP 2023-4 Colloquium I</h2>
        <h3>Sebastian Schloesser</h3>
      </>

    )
  }

  const UrbanScaleMetric: React.FC = () => {
    return (
      <div className="model-viewer">
        <h1>Panel 1</h1>
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
        </model-viewer>
      </div>
    )
  }

  const Panel3: React.FC = () => {
    return (
      <div>
        <h1>Panel 3</h1>
        <p>Subtitle 3</p>
      </div>
    )
  }

  const Panel4: React.FC = () => {
    return (
      <div>
        <h1>Panel 4</h1>
        <p>Subtitle 4</p>
      </div>
    )
  }

  const Panel6: React.FC = () => {
    return (
      <div>
        <h1>Panel 6</h1>
        <p>Subtitle 6</p>
      </div>
    )
  }

  const HPanel: React.FC<{ title: string }> = ({ title }) => {
    return (
      <div>
        <h1>HORIZONTAL Panel {title} </h1>
        <p>This is a custom panel component.</p>
      </div>
    )
  }

  const panels = [
    { title: '1. Intro', href: "#intro", component: IntroPanel },
    { title: '2. The System', href: "#system", component: IntroPanel },
    { title: '3. Methods', subtitle: 'Subtitle 3', href: "#methods", component: UrbanScaleMetric },
    {
      title: '3A. Reinventing the Row',
      href: "#row",
      horizontal: [
        { title: 'H1', subtitle: 'Horizontal 1', component: HPanel },
        { title: 'Developing an Urban Scale Metric', component: HPanel },
        { title: 'H3', subtitle: 'Horizontal 3', component: HPanel },
        { title: 'H4', subtitle: 'Horizontal 4', component: HPanel },
        { title: 'H5', subtitle: 'Horizontal 5', component: HPanel },
      ]
    },
    { title: '3B. Auto-Collection', subtitle: 'Subtitle 4', href: "#collection", component: Panel4 },
    {
      title: '3C. Interactive Reflection', subtitle: 'Subtitle 5', href: "#reflection", horizontal: [
        { title: 'H1', subtitle: 'Horizontal 1', component: HPanel },
        { title: 'H2', subtitle: 'Horizontal 2', component: HPanel },
        { title: 'H3', subtitle: 'Horizontal 3', component: HPanel },
        { title: 'H4', subtitle: 'Horizontal 4', component: HPanel },
        { title: 'H5', subtitle: 'Horizontal 5', component: HPanel },
      ]
    },
    { title: '4. Practice', subtitle: 'Subtitle 6', href: "#practice", component: Panel6 },
    { title: '5. Archive', subtitle: 'Subtitle 6', href: "#archvie", component: Panel6 },
  ];

  useGSAP(
    () => {
      const panelsContainer = document.getElementById("panels-container");

      /* Main navigation */
      document.querySelectorAll(".anchor").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          let targetElem = document.querySelector(e.target.getAttribute("href")),
            y = targetElem
          gsap.to(window, {
            scrollTo: {
              y: y,
              autoKill: false
            },
            onUpdate: ScrollTrigger.update,
            duration: 1
          });
        });
      });

      /* Panels */
      const horizontalContainers = gsap.utils.toArray(".carousel");
      horizontalContainers.forEach((container) => {
        const panels = gsap.utils.toArray(".panel", container)
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => "+=" + (container.offsetWidth),
            pinSpacing: true,
          }
        });
      });

      /* Model Viewer Camera Rotation */
      if (modelViewerRef.current) {
        gsap.to(modelViewerRef.current, {
          scrollTrigger: {
            trigger: modelViewerRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: true,
            onEnter: () => {
              modelViewerRef.current.play({ repetitions: 1 }); // Play the animation
            },
            onUpdate: (self) => {
              const progress = self.progress;
              const rotation = progress * 120; // Adjust rotation as needed
              modelViewerRef.current.setAttribute('camera-orbit', `${rotation}deg 20deg 3000m`);
            }
          }
        });

        // Add click event listener to the model viewer
        modelViewerRef.current.addEventListener('click', (event) => {
          const hotspotId = modelViewerRef.current.surfaceFromPoint(event.clientX, event.clientY);
          if (hotspotId) {
            console.log(`Hotspot ID: ${hotspotId}`);
          }
        });

        // Pin the header
        gsap.to(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            pin: true,
            end: "bottom top",
            pinSpacing: 'margin'
          }
        })
      }
    },
  )

  return (
    <div>
      <nav id="anchor-nav">
        {panels.map((panel, index) => (
          <a href={panel.href} key={panel.href} className="anchor">
            {panel.title}
          </a>
        ))}
      </nav>

      <div id="panels-container">
        <header class="header-container" ref={headerRef}>
          <div class="header-context">
            <div class="h2">
              <a class="fade" href="https://www.arch.columbia.edu/programs/15-m-s-computational-design-practices"
                target="_blank">Columbia GSAPP</a>
            </div>
          </div>

          <div class="header-title">
            <div class="h1">
              <a class="fade" href="/">Computational Design Practices</a>
            </div>
            <div class="h2">GSAPP CDP 2023-4 Colloquium I</div>
          </div>

          <div class="header-nav">
            <div class="h2">
              <a class="fade" href="/about">About</a>
            </div>
          </div>
        </header>

        {panels.map((panel, index) => {
          const Component = panel.component;
          return (
            <section key={index} className="panel" id={panel.href.substring(1)}>
              {!panel.horizontal && (
                <div className="content">
                  <Component />
                </div>
              )}
              {panel.horizontal && (
                <div className="carousel" style={{ width: `${100 * panel.horizontal.length}%` }}>
                  <div className="horizontal-container">
                    {panel.horizontal?.map((hPanel, hIndex) => {
                      const HComponent = hPanel.component;
                      return (
                        <article key={hIndex} className="panel">
                          <div className="content">
                            <HComponent title={hPanel.title} />
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  );
}