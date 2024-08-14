import React from "react";

export const MethodDataPanel: React.FC = () => {
  return (
    <div className="panel-content" id="manifesto-panel">
      <h2>Thoughts on Data...</h2>
      <br></br>
      <hr></hr>
      <br></br>
      <h3>
        When the hypothesis in question is too broad and complex, I believe
        taking an individual case perspective can help illuminate the key levers
        of the enveloping system. While one person won't influence the whole,
        individual decisions in aggregate do, and individuals seek frameworks to
        guide their decisions.
      </h3>
      <br></br>
      <h3>
        As Catherine D'Ignazio and Lauren Klein assert in <b>Data Feminism</b>,
        “data are not neutral or objective.” [5] The way they are collected
        tells a story. Forcefully approaching a particular data set with a
        specific question can lead to confirmation bias. In my explorations to
        answer the impossible, I allow myself to be guided by the affordances
        the data and tools at hand, remaining open to serendipitous insights and
        allowing the answers to (re)formulate the questions.
      </h3>
    </div>
  );
};

export const BillboardMap: React.FC = () => {
  return (
    <div className="panel-content">
      <h2>LA Billboard Data Set</h2>
      <div
        style={{
          height: "90vh",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <iframe src="billboard_map.html" width="100%" height="100%"></iframe>
      </div>
      <br></br>
      <h4 style={{ width: "90%" }}>
        This is a dataset of billboards and signage I found, geolocated and
        annotated [6]. It was created so that one day augmented reality
        ad-blockers may be developed. I am using it to explore the subconscious
        messaging that lingers in the mind after driving by all these
        impressions. I then merged this data with a navigation network such that
        routes can be optimized for a particular set of imagery.
      </h4>
    </div>
  );
};

export const RouteMap: React.FC = () => {
  return (
    <div className="panel-content">
      <h2>Optimizing Routes for Intentional Subliminal Exposure</h2>
      <br></br>
      <img src="church_route.png" width="50%" height="100%" />
      <h4>
        This network was weighted to optimize routes that pass through signage
        alluding to the label 'Church'. You can see the route deviates to pass
        through the relevant nodes.
      </h4>
    </div>
  );
};
