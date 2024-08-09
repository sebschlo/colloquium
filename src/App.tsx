import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

import { SystemPanel, MethodsPanel } from './systems';
import { IntroPanel } from './intro';
import { PracticePanel } from './practice';
import { ZinePanel } from './interactive';
import { MethodDataPanel } from './data';
import { MethodCompPanel, UrbanMetricPanel } from './computation';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);


export default function Scroll() {

  const headerRef = useRef(null);

  const scrollToHash = (hash: string) => {
    if (hash) {
      const targetElem = document.querySelector(hash);
      if (targetElem) {
        gsap.to(window, {
          scrollTo: {
            y: targetElem,
            autoKill: false
          },
          duration: 1,
          onComplete: () => {
            window.location.hash = hash; // Update the URL hash
          }
        });
      }
    }
  };

  useEffect(() => {
    scrollToHash(window.location.hash);
    window.addEventListener('hashchange', () => scrollToHash(window.location.hash));
    return () => {
      window.removeEventListener('hashchange', () => scrollToHash(window.location.hash));
    };
  }, []);


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
      href: "#computation",
      horizontal: [
        { title: 'H4', subtitle: 'Horizontal 4', component: HPanel },
        { title: 'H1', subtitle: 'Horizontal 1', component: MethodCompPanel },
        { title: 'Developing an Urban Scale Metric', component: UrbanMetricPanel },
        { title: 'H5', subtitle: 'Horizontal 5', component: HPanel },
        { title: 'H5', subtitle: 'Horizontal 5', component: HPanel },
      ]
    },
    { title: '3B. Critial Data-Collection', subtitle: 'Subtitle 4', href: "#collection", component: MethodDataPanel },
    { title: '4. Practice', subtitle: 'Subtitle 6', href: "#practice", component: PracticePanel },
    { title: '5. Archive', subtitle: 'Subtitle 6', href: "#archvie", component: UrbanMetricPanel },
  ];

  useGSAP(
    () => {
      /* Panels */
      const horizontalContainers = gsap.utils.toArray<HTMLElement>(".carousel");
      horizontalContainers.forEach((container) => {
        const panels = gsap.utils.toArray<HTMLElement>(".panel", container)
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
    },
  )

  return (
    <div>
      <nav id="anchor-nav">
        {panels.map((panel, index) => (
          <a
            href={panel.href}
            key={panel.href}
            className="anchor"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash(panel.href);
            }}
          >
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
                  {Component && <Component />}
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