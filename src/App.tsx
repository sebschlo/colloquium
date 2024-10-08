import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";

import { IntroPanel } from "./intro";
import { SystemPanel, MethodsPanel, FlowChart } from "./systems";
import { ZinePanel, PredictiveMap } from "./interactive";
import {
  DesignSpaceExplorer,
  GrumpinessPanel,
  MethodCompPanel,
  UrbanMetricPanel,
} from "./computation";
import { MethodDataPanel, BillboardMap, RouteMap } from "./data";
import { PracticePanel, EtcPanel } from "./practice";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Scroll() {
  const headerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const scrollToHash = (hash: string) => {
    if (hash) {
      const targetElem = document.querySelector(hash);
      if (targetElem) {
        gsap.to(window, {
          scrollTo: {
            y: targetElem,
            autoKill: false,
          },
          duration: 1,
          onComplete: () => {
            window.location.hash = hash; // Update the URL hash
          },
        });
      }
    }
  };

  useEffect(() => {
    scrollToHash(window.location.hash);
    window.addEventListener("hashchange", () =>
      scrollToHash(window.location.hash)
    );
    return () => {
      window.removeEventListener("hashchange", () =>
        scrollToHash(window.location.hash)
      );
    };
  }, []);

  useGSAP(() => {
    /* Panels */
    const horizontalContainers = gsap.utils.toArray<HTMLElement>(".carousel");
    horizontalContainers.forEach((container) => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel", container);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => "+=" + container.offsetWidth,
          pinSpacing: true,
          snap: {
            snapTo: 1 / (panels.length - 1), // Snap to each panel
            duration: { min: 0.2, max: 0.5 }, // Duration of the snap
            ease: "power1.inOut", // Easing function
          },
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Add the main horizontal scroll animation to the timeline
      timeline.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
      });

      // Store the timeline reference
      timelineRef.current = timeline;
    });

    // Pin the header
    gsap.to(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        pin: true,
        end: "bottom top",
        pinSpacing: "margin",
      },
    });

    // Highlight the current section in the menu
    panels.forEach((panel) => {
      ScrollTrigger.create({
        trigger: `#${panel.href.substring(1)}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentSection(panel.href),
        onEnterBack: () => setCurrentSection(panel.href),
      });
    });
  });

  const HIntroPanel: React.FC<{
    title: string;
    subtitle: string;
    timeline: gsap.core.Timeline | null;
  }> = ({ title, subtitle, timeline }) => {
    const h3Ref = useRef<HTMLDivElement>(null);

    return (
      <div className="hintro">
        <h3 ref={h3Ref} className="highlighted">
          {title}
        </h3>
        <h1>{subtitle}</h1>
      </div>
    );
  };

  const panels = [
    { title: "Intro", href: "#intro", component: IntroPanel },
    {
      title: "The System",
      href: "#system",
      component: SystemPanel,
    },
    // {
    //   title: "Inversion",
    //   subtitle: "Subtitle 3",
    //   href: "#inversion",
    //   component: FlowChart,
    // },
    {
      title: "Methods",
      subtitle: "Subtitle 3",
      href: "#methods",
      component: MethodsPanel,
    },
    {
      title: "Ethical Predictions",
      subtitle: "Subtitle 5",
      href: "#ethical-predictions",
      horizontal: [
        {
          title: "Method A",
          subtitle:
            "Examining bias and ethical dilemmas in predictive models through interactive web experiences",
          component: HIntroPanel,
        },
        { title: "H2", subtitle: "Horizontal 2", component: ZinePanel },
        {
          title: "Predictive Motion",
          subtitle: "what's my next move?",
          component: PredictiveMap,
        },
      ],
    },
    {
      title: "Quotidian Assumptions",
      href: "#questioning-assumptions",
      horizontal: [
        {
          title: "Method B",
          subtitle:
            "Questioning Quotidian Assumptions / Re-imagining the World Through Design Computation",
          component: HIntroPanel,
        },
        {
          title: "Comp2",
          subtitle: "Horizontal 1",
          component: MethodCompPanel,
        },
        {
          title: "Comp3",
          subtitle: "Horizontal 5",
          component: DesignSpaceExplorer,
        },
        {
          title: "Developing an Urban Scale Metric",
          component: UrbanMetricPanel,
        },
        {
          title: "Map",
          subtitle: "Luminance Metric vs. Grumpiness",
          component: GrumpinessPanel,
        },
      ],
    },
    {
      title: "Speculative Data",
      href: "#speculative-data",
      horizontal: [
        {
          title: "Method C",
          subtitle:
            "Anticipatory Resistance Through Speculative Data Collection and Intentional Subliminal Exposure",
          component: HIntroPanel,
        },
        {
          title: "Method C",
          subtitle: "Critical Automated Data-Collection",
          component: MethodDataPanel,
        },
        {
          title: "MethodC Example",
          subtitle: "Billboard Map",
          component: BillboardMap,
        },
        {
          title: "MethodC Route",
          subtitle: "Church route",
          component: RouteMap,
        },
      ],
    },
    {
      title: "Practice",
      subtitle: "Subtitle 6",
      href: "#practice",
      component: PracticePanel,
    },
    {
      title: "Etc.",
      subtitle: "Other works from Colloquium",
      href: "#etc",
      component: EtcPanel,
    },
  ];

  return (
    <div>
      <nav id="anchor-nav">
        {panels.map((panel, index) => (
          <a
            href={panel.href}
            key={panel.href}
            className={`anchor ${
              currentSection === panel.href ? "active" : ""
            }`}
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
          <div className="h1">
            <a href="https://www.arch.columbia.edu/" target="_blank">
              Columbia GSAPP
            </a>
          </div>

          <div className="h2" style={{ gridColumn: "span 2" }}>
            <a href="https://www.arch.columbia.edu/programs/15-m-s-computational-design-practices">
              M.S. Computational Design Practices
            </a>
            <br></br>
            <p>Home → Student Work → Sebastian Schloesser</p>
          </div>

          <nav>
            <a href="/colloquium-1-2024/">Home</a>
            <a href="/colloquium-1-2024/work">Student&nbsp;Work</a>
            <a
              href="https://docs.google.com/document/d/1Qo6nrXenc5JgFhbh6s3mjOBXv6vVZ-D5daYAWId5BBY/edit?usp=drive_link"
              target="_blank"
            >
              Syllabus
            </a>
            <a href="/colloquium-1-2024/about">About</a>
          </nav>
        </header>

        {panels.map((panel, index) => {
          const Component = panel.component;
          return (
            <section key={index} className="panel" id={panel.href.substring(1)}>
              {!panel.horizontal && <>{Component && <Component />}</>}
              {panel.horizontal && (
                <div
                  className="carousel"
                  style={{ width: `${100 * panel.horizontal.length}%` }}
                >
                  <div className="horizontal-container">
                    {panel.horizontal?.map((hPanel, hIndex) => {
                      const HComponent = hPanel.component;
                      return (
                        <article key={hIndex} className="panel">
                          <HComponent
                            title={hPanel.title}
                            subtitle={hPanel.subtitle}
                            timeline={timelineRef.current}
                            progress={scrollProgress}
                          />
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
