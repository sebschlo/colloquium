import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const IntroPanel: React.FC = () => {
  useEffect(() => {
    gsap.to(".rotate-letter", {
      rotationX: 180,
      rotationY: 20,
      duration: 3,
      ease: "none",
      scrollTrigger: {
        trigger: "#main-title",
        start: "top top+=30%",
        end: "bottom top+=20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="panel-content">
      <blockquote id="main-title">
        {Array.from("Inverting").map((letter, index) => (
          <span key={index} className="rotate-letter">
            {letter}
          </span>
        ))}{" "}
        <span className="highlighted">Spatial</span> Interfaces
      </blockquote>
      <h3>GSAPP CDP 2023-4 Colloquium I</h3>
      <h5>Sebastian Schloesser</h5>
    </div>
  );
};
