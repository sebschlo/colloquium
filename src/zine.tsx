declare var GazeCloudAPI: any;

import { createRoot } from 'react-dom/client';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';


// Globa Zine-App State
const states = {
    PRE_CALIBRATION: 0,
    CALIBRATION_COMPLETE: 1,
    TRAINING_COMPLETE: 2,
    REVIEW: 3,
    ERROR: 2,
};
var state = 0;



const images = [
    'public/doom.png',
    'public/doom.png',
    'public/doom.png',
    'public/doom.png',
    'public/doom.png',
    'public/doom.png',
    'public/doom.png',
    'public/doom.png',
    'public/doom.png',
];

const BetterGrid = () => {
    const handleMouseOver = (index: number) => {
        const card = document.getElementById(`card-${index}`);
        if (card) {
            card.style.transform = 'scale(0.95)';
        }
        console.log(`Mouse over card ${index + 1}`);
    };

    const handleMouseOut = (index: number) => {
        const card = document.getElementById(`card-${index}`);
        if (card) {
            card.style.transform = 'scale(1)';
        }
    };

    return (
        <Grid container spacing={2}>
            {images.map((image, index) => (
                <Grid item key={index} xs={4} style={{ padding: '8px' }}>
                    <Card
                        id={`card-${index}`}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseOut={() => handleMouseOut(index)}
                        style={{ transition: 'transform 0.2s' }}
                    >
                        <CardMedia
                            component="img"
                            image={image}
                            alt={`Image ${index + 1}`}
                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

const App = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="80%"
            maxWidth="800px"
            height="80vh"
            margin="0 auto"
            overflow="hidden"
        >
            <BetterGrid />
        </Box>
    );
};


// Render React component
const appElement = document.getElementById('app');
if (appElement) {
    const root = createRoot(appElement);
    root.render(<App />);
} else {
    console.error("App element not found");
}


function PlotGaze(GazeData: any) {

    /*
        GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
        GazeData.docX // gaze x in document coordinates
        GazeData.docY // gaze y in document cordinates
        GazeData.time // timestamp
    */
    const gazeDataElement = document.getElementById("GazeData");
    const headPhoseDataElement = document.getElementById("HeadPhoseData");
    const headRotDataElement = document.getElementById("HeadRotData");
    const gazeElement = document.getElementById("gaze");

    if (gazeDataElement && headPhoseDataElement && headRotDataElement && gazeElement) {
        gazeDataElement.innerHTML = "GazeX: " + GazeData.GazeX + " GazeY: " + GazeData.GazeY;
        headPhoseDataElement.innerHTML = " HeadX: " + GazeData.HeadX + " HeadY: " + GazeData.HeadY + " HeadZ: " + GazeData.HeadZ;
        headRotDataElement.innerHTML = " Yaw: " + GazeData.HeadYaw + " Pitch: " + GazeData.HeadPitch + " Roll: " + GazeData.HeadRoll;

        var x = GazeData.docX;
        var y = GazeData.docY;

        x -= gazeElement.clientWidth / 2;
        y -= gazeElement.clientHeight / 2;

        gazeElement.style.left = x + "px";
        gazeElement.style.top = y + "px";

        if (GazeData.state != 0) {
            if (gazeElement.style.display == 'block')
                gazeElement.style.display = 'none';
        }
        else {
            if (gazeElement.style.display == 'none')
                gazeElement.style.display = 'block';
        }
    }
}

//////set callbacks/////////
window.addEventListener("load", function () {
    if (typeof GazeCloudAPI !== 'undefined') {
        GazeCloudAPI.OnCalibrationComplete = function () {
            console.log('gaze Calibration Complete')
            state = states.CALIBRATION_COMPLETE;
        }
        GazeCloudAPI.OnCamDenied = function () { console.log('camera  access denied') }
        GazeCloudAPI.OnError = function (msg: any) { console.log('err: ' + msg) }
        GazeCloudAPI.UseClickRecalibration = false;
        GazeCloudAPI.OnResult = PlotGaze;
    } else {
        console.error("GazeCloudAPI is not defined");
    }
});