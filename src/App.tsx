import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';


import SystemPanel from './SystemPanel';


gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function Scroll() {
  const modelViewerRef = useRef(null);
  const headerRef = useRef(null);

  const IntroPanel: React.FC = () => {
    
    useEffect(() => {
      console.log('hallo')
      gsap.to('.rotate-letter', {
        rotation: 350,
        duration: 0.7,
        stagger: 0.1,
        ease: 'none'
      });
    }, []);

    return (
      <>
        <h1>
          {Array.from('Inverting').map((letter, index) => (
            <span key={index} className="rotate-letter">{letter}</span>
          ))} <span className="highlighted">Spatial</span> Interfaces
        </h1>
        <h2>GSAPP CDP 2023-4 Colloquium I</h2>
        <h3>Sebastian Schloesser</h3>
      </>
    )
  }

  const UrbanMetricPanel: React.FC = () => {
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

  const MethodsPanel: React.FC = () => {
    return (
      <div>
        <h2>Developing Methods</h2>
        <br></br>
        <hr></hr>
        <br></br>
        <p>In order to tackle this problem space in the Fall and Spring, I dedicated this term to exploring new methods in order to build a foundation. My aim was to learn new tools specifically focused on spatial design and analysis, to learn visual communication, and to build the conceptual foundation of my practice.</p>
      </div>
    )
  }


  const MethodAPanel: React.FC = () => {
    return (
      <div>
        <h2>Design Computation and Visual Storytelling</h2>
        <br></br>
        <h1>Reinventing the Row Home</h1>
        <hr></hr>
        <br></br>
        <p></p>
      </div>
    )
  }


  const MethodBPanel: React.FC = () => {
    return (
      <div>
        <h2>Automated Data Collection and Predictive Analysis</h2>
        <br></br>
        <hr></hr>
        <br></br>
        <h3>A Data Manifesto</h3>
        <p>
          Collecting data can be an immensely tedious task. Whenever possible, I believe it is essential to leverage automated, continuous collection. The data I'm using have been collected for years in the background without effort from my part. Of course, they afford a utilitarian view of myself as a commodity to be advertised to, but this doesn't prevent the reclaiming of it for the gleaning of alternative insights.
        </p>
        <br></br>
        <p>
          When the hypothesis in question is too broad and complex, I believe taking an individual case perspective can help illuminate the key levers of the system. In this case, the environmental cost of online shopping vs. brick-and-mortar is impossible to calculate. The nature of this problem is collective at heart, and one person won't influence the whole. However, we make decisions on a daily basis, that in aggregate do matter. How else can we guide our choices other than by analyzing our particular situation with the data at hand?
        </p>
      </div>
    )
  }

  const ZinePanel: React.FC = () => {
    return (
      <div className="full">
        <h1>The Trolley Problem</h1>
        <h2>A Zine on Generative AI</h2>
        <a href="/zine.html" style={{ position: 'relative', display: 'inline-block' }}>
          <img src="TrainBG.png" style={{ transition: 'box-shadow 0.3s' }} alt="Train Background" />
          <span style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3.1rem',
            color: 'rgb(255, 255, 255)',
            textShadow: '2px 2px 40px rgba(0, 0, 0, 0.9)',
            backgroundColor: 'black',
            padding: '10px'
          }}>
            Click to Play
          </span>
        </a>
      </div>
    )
  }

  const PracticePanel: React.FC = () => {
    return (
      <div>
        <h2>Combining into a Practice</h2>
        <br></br>
        <hr></hr>
        <br></br>
        <p>Inspect the world for opportunities, build tools and visualizations to understand and communicate it, design solutions to address core problem.</p>
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
    { title: '2. The System', href: "#system", component: SystemPanel },
    { title: '3. Methods', subtitle: 'Subtitle 3', href: "#methods", component: MethodsPanel },
    {
      title: '3A. Interactive-Reflexive Experiences', subtitle: 'Subtitle 5', href: "#reflection", horizontal: [
        { title: 'H1', subtitle: 'Horizontal 1', component: HPanel },
        { title: 'H2', subtitle: 'Horizontal 2', component: ZinePanel },
        { title: 'H3', subtitle: 'Horizontal 3', component: HPanel },
      ]
    },
    {
      title: '3B. Design Computation',
      href: "#row",
      horizontal: [
        { title: 'H1', subtitle: 'Horizontal 1', component: MethodAPanel },
        { title: 'Developing an Urban Scale Metric', component: UrbanMetricPanel },
        { title: 'H3', subtitle: 'Horizontal 3', component: HPanel },
        { title: 'H4', subtitle: 'Horizontal 4', component: HPanel },
        { title: 'H5', subtitle: 'Horizontal 5', component: HPanel },
      ]
    },
    { title: '3B. Critial Data-Collection', subtitle: 'Subtitle 4', href: "#collection", component: MethodBPanel },
    { title: '4. Practice', subtitle: 'Subtitle 6', href: "#practice", component: PracticePanel },
    { title: '5. Archive', subtitle: 'Subtitle 6', href: "#archvie", component: UrbanMetricPanel },
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
        console.log(panels.length)
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
            pinSpacing: 'margin',
            // markers: true
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
        <header className="header-container" ref={headerRef}>
          <div className="header-context">
            <div className="h2">
              <a className="fade" href="https://www.arch.columbia.edu/programs/15-m-s-computational-design-practices"
                target="_blank">Columbia GSAPP</a>
            </div>
          </div>

          <div className="header-title">
            <div className="h1">
              <a className="fade" href="/">Computational Design Practices</a>
            </div>
            <div className="h2">GSAPP CDP 2023-4 Colloquium I</div>
          </div>

          <div className="header-nav">
            <div className="h2">
              <a className="fade" href="/about">About</a>
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