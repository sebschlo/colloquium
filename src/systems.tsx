import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { gsap } from "gsap";
import LoopIcon from "@mui/icons-material/Loop";
import Paper from "@mui/material/Paper";

export const SystemPanel: React.FC = () => {
  return (
    <div>
      <Paper className="message-paper">
        <h4>Digital World mediating interactions with the Built Environment</h4>
      </Paper>

      <br />
      <LoopIcon className="center-icon" />
      <br />
      <br />
      <Paper className="message-paper">
        <h4>Built environment mediating navigation and social interactions</h4>
      </Paper>
      <br />
      <LoopIcon className="center-icon" />
      <br />
      <br />
      <Paper className="message-paper">
        <h4>Built environment mediating digital interactions</h4>
      </Paper>
    </div>
  );
};

export const MethodsPanel: React.FC = () => {
  return (
    <div>
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
      { id: 1, text: "Start", x: 50, y: 50 },
      { id: 2, text: "Step 1", x: 200, y: 50 },
      { id: 3, text: "Step 2", x: 200, y: 150 },
      { id: 4, text: "End", x: 350, y: 150 },
    ];

    const links = [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
    ];

    const simulation = d3
      .forceSimulation(data)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
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
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", "lightblue")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    const label = svg
      .selectAll("text")
      .data(data)
      .enter()
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

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
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

    gsap.from(node.nodes(), { duration: 1, opacity: 0, stagger: 0.2 });
    gsap.from(label.nodes(), {
      duration: 1,
      opacity: 0,
      stagger: 0.2,
      delay: 0.5,
    });
  }, []);

  return <svg ref={chartRef}></svg>;
};
