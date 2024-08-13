import React from "react";

export const MethodDataPanel: React.FC = () => {
  return (
    <div>
      <h2>A Data Manifesto</h2>
      <br></br>
      <hr></hr>
      <br></br>
      <br></br>
      <h3>
        Collecting data can be an immensely tedious task. Whenever possible, I
        believe it is essential to leverage automated, continuous collection.
        The data I'm using have been collected for years in the background
        without effort from my part. Of course, they afford a utilitarian view
        of myself as a commodity to be advertised to, but this doesn't prevent
        the reclaiming of it for the gleaning of alternative insights.
      </h3>
      <br></br>
      <h3>
        When the hypothesis in question is too broad and complex, I believe
        taking an individual case perspective can help illuminate the key levers
        of the system. In this case, the environmental cost of online shopping
        vs. brick-and-mortar is impossible to calculate. The nature of this
        problem is collective at heart, and one person won't influence the
        whole. However, we make decisions on a daily basis, that in aggregate do
        matter. How else can we guide our choices other than by analyzing our
        particular situation with the data at hand?
      </h3>
    </div>
  );
};

export const BillboardMap: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "90vh",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <iframe src="/billboard_map.html" width="100%" height="100%"></iframe>
      </div>
      <h3>
        This is a dataset of billboards and signage, geolocated and annotated.
        It was created so that one day augmented reality ad-blockers may be
        developed. I am using it to explore the subconscious messaging that
        lingers in the mind after driving by all these impressions. I then
        merged this data with a navigation network such that routes can be
        optimized for a particular set of imagery.
      </h3>
    </div>
  );
};

export const RouteMap: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        width: "80%",
      }}
    >
      <h2>Optimizing Routes for Subliminality</h2>
      <br></br>
      <img src="/church_route.png" width="100%" height="100%" />
      <h3>
        This network was weighted to optimize routes that pass through signange
        alluding to the word 'Church'.
      </h3>
    </div>
  );
};
