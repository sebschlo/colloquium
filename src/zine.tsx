declare var GazeCloudAPI: any;

import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { Button, Grid, Card, CardMedia, Box, Typography, Paper, Stack } from '@mui/material';
import charactersJSON from '../public/characters.json';
import TrolleyProblemUI from './trolley';
import Review from './review';

// Globa Zine-App State
const states = {
    CALIBRATION: 0,
    TRAINING: 1,
    TROLLEY: 2,
    REVIEW: 3,
    ERROR: -1,
};

const generateNewImages = true;

export class Character {
    id: number;
    img: string;
    adjective: string;
    profession: string;
    species: string;

    constructor(id: number, img: string, adjective: string, profession: string, species: string) {
        this.id = id;
        this.img = img;
        this.adjective = adjective;
        this.profession = profession;
        this.species = species;
    }

    generateDescription(): string {
        return `A ${this.adjective} ${this.species} who works as a ${this.profession} in a dating-sim-style background in 8-bit.`;
    }

    generateDisplayDescription(): string {
        return `A ${this.adjective} ${this.species} who works as a ${this.profession}.`;
    }
}


const charactersData = charactersJSON.characters.map((char: any) =>
    new Character(char.id, char.img, char.adjective, char.profession, char.species)
);



const PreCalibration = ({ onStop }: { onStop: () => void }) => {
    function stopCalibration() {
        GazeCloudAPI.StopEyeTracking();
        onStop()
    }
    return (
        <Box sx={{ padding: 6 }}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Zine!
            </Typography>

            <Typography variant="body1" gutterBottom>
                Eye tracking calibration is required for this interactive experience. Please press start and follow the instructions.
            </Typography>

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => GazeCloudAPI.StartEyeTracking()}>
                        Start
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={stopCalibration}>
                        Proceed without eye tracking
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="body1" gutterBottom sx={{ marginTop: 6 }}>
               Hao Lee | Judd Smith | Sebastian Schloesser
            </Typography>
            {/* <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="body1" gutterBottom>
                    Real-Time Result:
                </Typography>
                <Typography variant="body2" id="GazeData" gutterBottom></Typography>
                <Typography variant="body2" id="HeadPhoseData" gutterBottom></Typography>
                <Typography variant="body2" id="HeadRotData" gutterBottom></Typography>
            </Paper> */}

            <div
                id="gaze"
                style={{
                    position: 'absolute',
                    display: 'none',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    border: 'solid 2px rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 100px 3px rgba(125, 125, 125, 0.5)',
                    pointerEvents: 'none',
                    zIndex: 999999,
                }}
            ></div>
        </Box>
    );
}


const CharacterGrid = ({ chars, onImageClick, clickMode }: { chars: Character[], onImageClick: (index: number) => void, clickMode: boolean}) => {
    const handleMouseOver = (index: number) => {
        const card = document.getElementById(`card-${index}`);
        if (card) {
            card.style.transform = 'scale(0.95)';
        }
        // console.log(`Mouse over card ${index + 1}`);
    };

    const handleMouseOut = (index: number) => {
        const card = document.getElementById(`card-${index}`);
        if (card) {
            card.style.transform = 'scale(1)';
        }
    };

    return (
        <Stack spacing={1}>
            {clickMode && <Typography variant="body1" gutterBottom align="center">
                Pick your favorite characters.
            </Typography>}
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
        </Stack>
    )
}


const trolleyProblemCharacterPairings: [number, number][] = [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
];

const TrolleyProblem = ({ characterSaved, onComplete }: { characterSaved: (character: number) => void, onComplete: () => void }) => {
    const [state, setState] = useState<'INITIAL' | 'FLASH_TEXT' | 'FINAL_CONTENT'>('INITIAL');
    const [currentPairIndex, setCurrentPairIndex] = useState<number>(0);
    const [shownCharacters, setShownCharacters] = useState<Character[]>([]);

    // Show intro text sequence
    useEffect(() => {
        if (state === 'INITIAL') {
            const timer1 = setTimeout(() => {
                setState('FLASH_TEXT');
                console.log('FLASH_TEXT');
            }, 3000);

            const timer2 = setTimeout(() => {
                setState('FINAL_CONTENT');
                console.log('FINAL_CONTENT');
            }, 6000);
        }
    }, [state]);

    // Show trolley problem character pairings
    useEffect(() => {
        if (currentPairIndex < trolleyProblemCharacterPairings.length) {
            const pair = trolleyProblemCharacterPairings[currentPairIndex];
            setShownCharacters([charactersData[pair[0]], charactersData[pair[1]]]);
        }
    }, [currentPairIndex]);

    function characterSelected(character: Character, index: number) {
        characterSaved(character.id);
        if (currentPairIndex < trolleyProblemCharacterPairings.length - 1) {
            setCurrentPairIndex(currentPairIndex + 1);
        } else {
            console.log('All pairs have been shown.');
            onComplete();
        }
    }

    return (
        <div>
            {state === 'INITIAL' && <Typography variant="h1">A runaway train interrupts your session.</Typography>}
            {state === 'FLASH_TEXT' && <Typography variant="h1">Quick! Decide who to save...</Typography>}
            {state === 'FINAL_CONTENT' && <TrolleyProblemUI characters={shownCharacters} onCharacterPress={characterSelected} />}
        </div>
    );
}


const App = () => {
    const getRandomCharacters = (data: Character[], count: number) => {
        const startIndex = Math.floor(Math.random() * (data.length - count + 1));
        return data.slice(startIndex, startIndex + count);
    };

    // STATES
    const [characters, setCharacters] = useState<Character[]>(getRandomCharacters(charactersData, 9));
    const [queue, setQueue] = useState<number[]>([]);
    const [appState, setAppState] = useState<number>(states.CALIBRATION);
    const [clickedCharacters, setClickedCharacters] = useState<Character[]>([]);
    const [savedCharacters, setSavedCharacters] = useState<number[]>([]);
    const [aiSaveDecisions, setAiSaveDecisions] = useState<number[]>([]);
    const [aiJustifications, setAiJustifications] = useState<string[]>([]);
    const [clickMode, setClickMode] = useState<boolean>(false);


    async function generateImage(description: string): Promise<string> {
        try {
            const response = await fetch('https://cdp-zine-9f7edc748580.herokuapp.com/generate-image', {
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

    async function generateTrolleyProblemAgent() {

        const description: string = clickedCharacters.map(character => character.generateDisplayDescription()).join(' ');

        const scenarios = trolleyProblemCharacterPairings.map(pair => {
            const char1 = charactersData[pair[0]];
            const char2 = charactersData[pair[1]];
            return `A trolley is coming and there are two tracks it can take, and both have a character standing on it. Based on the types of characters you genrally like, who would you save between ${char1.generateDisplayDescription().replace('.', '')} and ${char2.generateDisplayDescription().replace('.', '')}? It doesn't matter if the characters don't match your predilections exactly, pick the most similar.`;
        });

        const response = await fetch('https://cdp-zine-9f7edc748580.herokuapp.com/trolley-problem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: description,
                scenarios: scenarios
            })
        });

        const respDec = await response.json();
        setAiSaveDecisions(respDec.decisions.map((d: { decision: number }) => d.decision));
        setAiJustifications(respDec.justifications.map((d: { justification: string }) => d.justification));
    }

    const handleTrainingClick = (index: number) => {
        const clickedCharacter = characters[index];

        console.log('clicked character: ', clickedCharacter, '  index: ', index)

        // Keep track of clicked characters in state, ensuring no duplicates
        setClickedCharacters(prevClickedCharacters => {
            return [...prevClickedCharacters, clickedCharacter];
        });

        // Training complete, transition to next phase
        if (clickedCharacters.length > 10) {
            setAppState(states.TROLLEY);
            generateTrolleyProblemAgent();
            setQueue([]); // stop generating new images
            return
        }

        const matchingCharacters = charactersData.filter((char: Character) =>
            (char.adjective === clickedCharacter.adjective ||
                char.profession === clickedCharacter.profession ||
                char.species === clickedCharacter.species) &&
            char.id !== clickedCharacter.id &&
            !characters.some(existingChar => existingChar.id === char.id)
        );

        if (matchingCharacters.length > 0) {
            const randomIndex = Math.floor(Math.random() * matchingCharacters.length);
            const replacementCharacter = matchingCharacters[randomIndex];

            setCharacters(prevCharacters => {
                const newCharacters = [...prevCharacters];
                let replaceIndex;
                do {
                    replaceIndex = Math.floor(Math.random() * newCharacters.length);
                } while (replaceIndex === index);
                newCharacters[replaceIndex] = replacementCharacter;
                return newCharacters;
            });
        }
        setQueue(prevQueue => [...prevQueue, index]);
    };

    function handleTrolleyClick(character: number) {
        console.log('character pressed: ', character)
        setSavedCharacters([...savedCharacters, character]);
    }

    // Process image replacement Queue
    useEffect(() => {
        const interval = setInterval(async () => {
            if (queue.length > 0 && generateNewImages) {
                const index = queue[0];
                console.log('Popping queue, ordering new image at index: ', index, ' queue size: ', queue.length)
                const url = await generateImage(characters[index].generateDescription());
                if (url) {
                    // Add the new character to our inventory
                    const newChar = new Character(charactersData.length, url, characters[index].adjective, characters[index].profession, characters[index].species);
                    console.log('creating new character: ', newChar)
                    charactersData.push(newChar)
                    setCharacters(prevCharacters => {
                        // Replace at the next index with the new one
                        const newCharacters = [...prevCharacters];
                        const replaceIndex = (index + 2) % newCharacters.length;
                        newCharacters[replaceIndex] = newChar;
                        return newCharacters;
                    });
                }
                setQueue(prevQueue => prevQueue.slice(1));
            }
        }, 12000);

        return () => clearInterval(interval);
    }, [queue]);

    // Process eye gaze
    useEffect(() => {
        if (typeof GazeCloudAPI !== 'undefined') {
            GazeCloudAPI.OnCalibrationComplete = function () {
                console.log('gaze Calibration Complete')
                setAppState(states.TRAINING);
            }
            GazeCloudAPI.OnCamDenied = function () { console.log('camera  access denied') }
            GazeCloudAPI.OnError = function (msg: any) { console.log('err: ' + msg) }
            GazeCloudAPI.UseClickRecalibration = false;
            GazeCloudAPI.OnResult = PlotGaze;
        } else {
            console.error("GazeCloudAPI is not defined");
        }
    }, []);

    function handleCalibrationOptOut() {
        setAppState(states.TRAINING);
        setClickMode(true);
    }

    function handleTrolleyComplete() {
        setAppState(states.REVIEW);
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            width="80%"
            maxWidth="800px"
            height="80vh"
            margin="0 auto"
            overflow="hidden"
        >
            {appState === states.CALIBRATION && <PreCalibration onStop={handleCalibrationOptOut} />}
            {appState === states.TRAINING && <CharacterGrid chars={characters} onImageClick={handleTrainingClick} clickMode={clickMode} />}
            {appState === states.TROLLEY && <TrolleyProblem characterSaved={handleTrolleyClick} onComplete={handleTrolleyComplete} />}
            {appState === states.REVIEW
            && <Review characters={charactersData}
                    trolleyPairings={trolleyProblemCharacterPairings}
                    decisions={savedCharacters} 
                    aiDecisions={aiSaveDecisions}
                    justifications={aiJustifications}/>}
            {appState === states.ERROR && <div>Error!</div>}
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

