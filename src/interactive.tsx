import React from "react";

export const ZinePanel: React.FC = () => {
  return (
    <div className="full">
      <h1>The Trolley Problem</h1>
      <h2>A Zine on Generative AI</h2>
      <a
        href="/zine.html"
        style={{ position: "relative", display: "inline-block" }}
      >
        <img
          src="TrainBG.png"
          style={{ transition: "box-shadow 0.3s" }}
          alt="Train Background"
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3.1rem",
            color: "rgb(255, 255, 255)",
            textShadow: "2px 2px 40px rgba(0, 0, 0, 0.9)",
            backgroundColor: "black",
            padding: "10px",
          }}
        >
          Click to Play
        </span>
      </a>
    </div>
  );
};
