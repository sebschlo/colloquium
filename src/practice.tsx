import React from "react";
import LinkIcon from "@mui/icons-material/Link"; // Import the Link icon

export const PracticePanel: React.FC = () => {
  return (
    <div className="panel-content">
      <h2>Combining into a Practice</h2>
      <br></br>
      <hr></hr>
      <br></br>
      <h4>
        These methods will form the basis for my practice, which will consist in
        applying them to the problem of inverting spatial interfaces, and
        inventing ways for the built environment to mediate social and digital
        interactions.
      </h4>
      <br></br>
      <h4></h4>
    </div>
  );
};

export const EtcPanel: React.FC = () => {
  return (
    <div className="panel-content" id="etc-panel">
      <h3>Links</h3>
      <a href="/archive.html">
        <LinkIcon /> Additional Colloquium Work Archive
      </a>
      <a href="https://github.com/sebschlo/colloquium">
        <LinkIcon /> This Site's GitHub
      </a>
      <a href="https://sebs.gallery">
        <LinkIcon /> Pre-GSAPP Portfolio
      </a>
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>
      <h3>References</h3>
      <h5>[1] bla bla lba</h5>
      <h5>[2] bla bla lba</h5>
      <h5>[3] bla bla lba</h5>
      <h5>[4] bla bla lba</h5>
      <h5>[5] bla bla lba</h5>
    </div>
  );
};
