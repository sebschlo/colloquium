import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import LoopIcon from "@mui/icons-material/Loop";
import Paper from "@mui/material/Paper";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SystemPanel: React.FC = () => {
  const paperRefs = useRef<HTMLDivElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  const useGSAP = (
    paperRefs: React.RefObject<HTMLDivElement[]>,
    textRefs: React.RefObject<HTMLDivElement[]>
  ) => {
    useEffect(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#system-panel-pin",
          start: "top bottom",
          //   end: "+=4000px", // Adjust this value to control the pin duration
          end: "top top",
          pin: false,
          scrub: true,
          //   markers: true,
        },
      });
      tl.fromTo(".center-icon", { opacity: 0 }, { opacity: 1, duration: 1 });
      paperRefs.current.forEach((paper, index) => {
        tl.fromTo(
          paper,
          { y: 50, opacity: 0 }, // Adjusted y value
          {
            y: 0,
            opacity: 1,
            duration: 1.5, // Adjusted duration
            ease: "power1.inOut",
          },
          index * 1.5 // Adjusted stagger
        );
      });

      tl.fromTo(
        ".center-icon",
        { opacity: 1 },
        {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            document.querySelector(".center-icon")?.remove();
          },
        }
      );

      tl.to(paperRefs.current, {
        scale: 0.6,
        // x: (index) => index * 200 - 200,
        // y: (index) => index * -100,
        duration: 2,
        ease: "power1.inOut",
        stagger: 0.5,
      });

      // Animate additional text elements
      textRefs.current.forEach((text, index) => {
        tl.fromTo(
          text,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
          },
          "-=1" // Start the text animation slightly before the previous animation ends
        );
      });
    }, [paperRefs, textRefs]);
  };

  useGSAP(paperRefs, textRefs);

  return (
    <div id="system-panel-pin">
      <div className="panel-content" id="system-panel-content">
        <Paper
          className="message-paper"
          ref={(el) => (paperRefs.current[0] = el!)}
        >
          <h2>
            <strong>Digital</strong> mediating interactions with the{" "}
            <strong>built environment</strong>
          </h2>
        </Paper>
        <div ref={(el) => (textRefs.current[0] = el!)}>
          <h5>
            <ul>
              <li>maps and nav</li>
              <li>reviews</li>
              <li>rfID</li>
            </ul>
          </h5>
        </div>
        <LoopIcon className="center-icon" />
        <Paper
          className="message-paper"
          ref={(el) => (paperRefs.current[1] = el!)}
        >
          <h2>
            <strong>Built environment</strong> mediating <strong>social</strong>{" "}
            and <strong>spatial interactions</strong>
          </h2>
        </Paper>
        <div ref={(el) => (textRefs.current[1] = el!)}>
          <h5>
            <ul>
              <li>intuition and affordances</li>
              <li>signage</li>
              <li>environmental comfort (loudness, temp, bright)</li>
            </ul>
          </h5>
        </div>
        <LoopIcon className="center-icon" />
        <Paper
          className="message-paper"
          ref={(el) => (paperRefs.current[2] = el!)}
        >
          <h2>
            <strong>Built environment</strong> mediating{" "}
            <strong>digital interactions</strong>
          </h2>
        </Paper>
        <div ref={(el) => (textRefs.current[2] = el!)}>
          <h5>
            <ul>
              <li>iot + phone</li>
              <li>ads</li>
              <li>availability of wifi</li>
              <li>qr codes</li>
              <li>???</li>
            </ul>
          </h5>
        </div>
      </div>
    </div>
  );
};

export const MethodsPanel: React.FC = () => {
  return (
    <div className="panel-content">
      <h1>Developing Methods</h1>
      <br></br>
      <hr></hr>
      <br></br>
      <h4>
        In order to tackle this problem space in the subsequent colloquia, I
        dedicated this term to exploring new methods in order to build a
        technical foundation. My aim was to learn new tools specifically focused
        on spatial design and analysis, to improve my visual communication
        skills, and to begin developing the conceptual basis of my practice.
      </h4>
    </div>
  );
};
