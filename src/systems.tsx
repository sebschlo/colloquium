import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { gsap } from "gsap";
import LoopIcon from "@mui/icons-material/Loop";
import Paper from "@mui/material/Paper";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const SystemPanel: React.FC = () => {
  return (
    <div className="content">
      <Paper className="message-paper">
        <h1>Digital World mediating interactions with the Built Environment</h1>
      </Paper>

      <br />
      <LoopIcon className="center-icon" />
      <br />
      <br />
      <Paper className="message-paper">
        <h2>Built environment mediating navigation and social interactions</h2>
      </Paper>
      <br />
      <LoopIcon className="center-icon" />
      <br />
      <br />
      <Paper className="message-paper">
        <h3>Built environment mediating digital interactions</h3>
      </Paper>
    </div>
  );
};

export const MethodsPanel: React.FC = () => {
  return (
    <div className="content">
      <h1>Developing Methods</h1>
      <br></br>
      <hr></hr>
      <br></br>
      <p>
        In order to tackle this problem space in the Fall and Spring, I
        dedicated this term to exploring new methods in order to build a
        foundation. My aim was to learn new tools specifically focused on
        spatial design and analysis, to learn visual communication, and to build
        the conceptual foundation of my practice.
      </p>
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

  return <svg className="fill-panel" ref={chartRef}></svg>;
};
