import { createRoot } from 'react-dom/client';
declare var GazeCloudAPI: any;

// Render your React component instead
const appElement = document.getElementById('app');
if (appElement) {
    const root = createRoot(appElement);
    root.render(<h1>Hello, world</h1>);
} else {
    console.error("App element not found");
}

const states = {
    PRE_CALIBRATION: 0,
    CALIBRATION_COMPLETE: 1,
    TRAINING_COMPLETE: 2,
    REVIEW: 3,
    ERROR: 2,
};
var state = 0;

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