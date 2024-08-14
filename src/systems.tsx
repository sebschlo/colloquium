import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
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
          start: "top top",
          end: "+=2000", // Adjust this value to control the pin duration
          pin: true,
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

export const FlowChart: React.FC = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(chartRef.current)
      .attr("width", 600)
      .attr("height", 400);

    const data = [
      { id: 1, text: "Node 1", x: 100, y: 100 },
      { id: 2, text: "Node 2", x: 300, y: 100 },
      { id: 3, text: "Node 3", x: 200, y: 300 },
    ];

    const links = [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 1 },
    ];

    const simulation = d3
      .forceSimulation(data)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(150)
          .strength(0.1) // Spring-like behavior
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(300, 200))
      .on("tick", ticked);

    const link = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "black");

    const node = svg
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    node
      .append("circle")
      .attr("r", 40) // Larger radius
      .attr("fill", "lightblue");

    node
      .append("text")
      .attr("dy", 5)
      .attr("text-anchor", "middle")
      .text((d) => d.text);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(node.nodes(), {
      y: -100,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: chartRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          data.forEach((d) => {
            d.vx = (Math.random() - 0.5) * 10 * progress;
            d.vy = (Math.random() - 0.5) * 10 * progress;
          });
          simulation.alpha(1).restart();
        },
      },
    });
  }, []);

  return (
    <div
      className="fill-panel"
      id="example-panel"
      style={{ position: "relative" }}
    >
      <h2>Example Interface Inversion</h2>
      <svg ref={chartRef}></svg>
    </div>
  );
};
