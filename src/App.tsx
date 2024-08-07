import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function Scroll() {

  const menu = useRef()

  const panels = [
    { title: 'Panel 1', subtitle: 'Subtitle 1', href: "#intro" },
    {
      title: 'Panel 2', subtitle: 'Subtitle 2', href: "#panel2", horizontal: [
        { title: 'H1', subtitle: 'Horizontal 1' },
        { title: 'H2', subtitle: 'Horizontal 2' },
        { title: 'H3', subtitle: 'Horizontal 3' },
        { title: 'H4', subtitle: 'Horizontal 4' },
        { title: 'H5', subtitle: 'Horizontal 5' },
      ]
    },
    { title: 'Panel 3', subtitle: 'Subtitle 3', href: "#panel3" },
    { title: 'Panel 4', subtitle: 'Subtitle 4', href: "#panel4" },
    {
      title: 'Panel 5', subtitle: 'Subtitle 5', href: "#panel5", horizontal: [
        { title: 'H1', subtitle: 'Horizontal 1' },
        { title: 'H2', subtitle: 'Horizontal 2' },
        { title: 'H3', subtitle: 'Horizontal 3' },
        { title: 'H4', subtitle: 'Horizontal 4' },
        { title: 'H5', subtitle: 'Horizontal 5' },
      ]
    },
    { title: 'Panel 6', subtitle: 'Subtitle 6', href: "#panel6" },
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
          xPercent: -100 * (panels.length),
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => "+=" + (container.offsetWidth),
            pinSpacing: true,
          }
        });
      });
    },
  )

  return (
    <div>
      <nav id="anchor-nav" ref={menu}>
        {panels.map((panel, index) => (
          <a href={panel.href} key={panel.title} className="anchor">
            {panel.title}
          </a>
        ))}
      </nav>

      <div id="panels-container">
        {panels.map((panel, index) => (
          <section key={index} className="panel" id={panel.href.substring(1)}>
            {!panel.horizontal && (
              <div className="content">
                <h1>{panel.title}</h1>
                <h2>{panel.subtitle}</h2>
              </div>
            )}
            {panel.horizontal && (
              <div className="carousel" style={{ width: `${100 * panel.horizontal.length}%` }}>
                <div className="horizontal-container">
                  {panel.horizontal?.map((hPanel, hIndex) => (
                    <article key={hIndex} className="panel">
                      <div className="content">
                        <h3>{hPanel.title}</h3>
                        <h4>{hPanel.subtitle}</h4>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>

        ))}
      </div>
    </div>
  );
}