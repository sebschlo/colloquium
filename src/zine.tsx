declare var GazeCloudAPI: any;

import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
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

class Character {
    img: string;
    adjective: string;
    profession: string;
    species: string;

    constructor(img: string, adjective: string, profession: string, species: string) {
        this.img = img;
        this.adjective = adjective;
        this.profession = profession;
        this.species = species;
    }

    generateDescription(): string {
        return `A ${this.adjective} ${this.species} who works as a ${this.profession} in a dating-sim-style background in 8-bit.`;
    }
}

const initialCharacters = [
    new Character("public/a-careless-reptilian-soldier-in-a-dating-sim-style.png", "careless", "soldier", "reptilian"),
    new Character("a-funny-rhino-pilot-in-a-dating-sim-style-backgrou.png", "funny", "pilot", "rhino"),
    new Character("public/a-loyal-yeti-dancer-in-a-dating-sim-style-backgrou.png", "loyal", "dancer", "yeti"),
    new Character("public/a-mean-slug-nanny-in-a-dating-sim-style-background.png", "mean", "nanny", "slug"),
    new Character("a-messy-griffin-spy-in-a-dating-sim-style-backgrou.png", "messy", "griffin", "spy"),
    new Character("public/a-peaceful-bobcat-model-in-a-dating-sim-style-back.png", "epaceful", "model", "bobcat"),
    new Character("a-prideful-fly-lawyer-in-a-dating-sim-style-backgr.png", "prideful", "lawyer", "fly"),
    new Character("public/a-sensitive-shark-manager-in-a-dating-sim-style-ba.png", "sensitive", "shark", "manager"),
    new Character("public/a-silent-zombie-nurse-in-a-dating-sim-style-backgr.png", "silent", "nurse", "zombie")
];

async function generateImage(description: string): Promise<string> {
    try {
        const response = await fetch('http://localhost:3000/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('received from openai: ', data)
        console.log('received image: ', data.image)
        return data.image;
    } catch (error) {
        console.error('Error generating image:', error);
        return '';
    }
}

const BetterGrid = ({ chars, onImageClick }: { chars: Character[], onImageClick: (index: number) => void }) => {
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
            {chars.map((char, index) => (
                <Grid item key={index} xs={4} style={{ padding: '8px' }}>
                    <Card
                        id={`card-${index}`}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseOut={() => handleMouseOut(index)}
                        onClick={() => onImageClick(index)}
                        style={{ transition: 'transform 0.2s' }}
                    >
                        <CardMedia
                            component="img"
                            image={char.img}
                            alt={`Image ${index + 1}`}
                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

const App = () => {
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);
    const [queue, setQueue] = useState<number[]>([]);

    // Process image replacement Queue
    useEffect(() => {
        const interval = setInterval(async () => {
            if (queue.length > 0) {
                const index = queue[0];
                const url = await generateImage(characters[index].generateDescription());
                if (url) {
                    setCharacters(prevCharacters => {
                        const newCharacters = [...prevCharacters];
                        newCharacters[index] = new Character(url, characters[index].adjective, characters[index].profession, characters[index].species);
                        return newCharacters;
                    });
                }
                setQueue(prevQueue => prevQueue.slice(1));
            }
        }, 12000);

        return () => clearInterval(interval);
    }, [queue]);

    const handleImageClick = (index: number) => {
        setQueue(prevQueue => [...prevQueue, index]);
    };

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
            <BetterGrid chars={characters} onImageClick={handleImageClick} />
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