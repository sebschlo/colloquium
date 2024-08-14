import React from "react";
import LinkIcon from "@mui/icons-material/Link"; // Import the Link icon

export const PracticePanel: React.FC = () => {
  return (
    <div className="panel-content">
      <h2>Combining into a Practice</h2>
      <br></br>
      <hr></hr>
      <br></br>
      <h1>
        These methods will form the basis for my practice, which will explore
        ways for the built environment to mediate social and digital
        interactions.
      </h1>
      <br></br>
      <h4></h4>
    </div>
  );
};

export const EtcPanel: React.FC = () => {
  return (
    <div className="panel-content" id="etc-panel">
      <h3>Links</h3>
      <a href="archive.html">
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
      <h5>
        <a href="bla bla lba" target="_blank" rel="noopener noreferrer">
          [1] https://platform.openai.com/docs/api-reference/introduction
        </a>
      </h5>
      <h5>
        <a
          href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2021.578277/full"
          target="_blank"
          rel="noopener noreferrer"
        >
          [2]
          https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2021.578277/full
        </a>
      </h5>
      <h5>
        <a
          href="https://oldstructures.com/2019/03/18/dumbbells/"
          target="_blank"
          rel="noopener noreferrer"
        >
          [3] https://oldstructures.com/2019/03/18/dumbbells/
        </a>
      </h5>
      <h5>
        <a
          href="https://www.nyc.gov/site/planning/data-maps/open-data/dwn-nyc-3d-model-download.page"
          target="_blank"
          rel="noopener noreferrer"
        >
          [4]
          https://www.nyc.gov/site/planning/data-maps/open-data/dwn-nyc-3d-model-download.page
        </a>
      </h5>
      <h5>
        <a
          href="https://data-feminism.mitpress.mit.edu/pub/czq9dfs5/release/2"
          target="_blank"
          rel="noopener noreferrer"
        >
          [5] https://data-feminism.mitpress.mit.edu/pub/czq9dfs5/release/2
        </a>
      </h5>
      <h5>
        <a
          href="https://www.kaggle.com/datasets/mekabytes/billboards-signs-and-branding/data"
          target="_blank"
          rel="noopener noreferrer"
        >
          [6]
          https://www.kaggle.com/datasets/mekabytes/billboards-signs-and-branding/data
        </a>
      </h5>
    </div>
  );
};
