declare var GazeCloudAPI: any;

import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { Button, Grid, Card, CardMedia, Box, Typography, Paper, Stack } from '@mui/material';
import charactersJSON from '../public/characters.json';
import trolleyCharactersJSON from '../public/trolley_characters.json';
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
    description?: string;

    constructor(id: number, img: string, adjective: string, profession: string, species: string, description?: string) {
        this.id = id;
        this.img = img;
        this.adjective = adjective;
        this.profession = profession;
        this.species = species;
        this.description = description;
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

const trolleyCharactersData = trolleyCharactersJSON.map((char: any) =>
    new Character(char.id, char.img, char.adjective, char.profession, char.species, char.description)
);


const PreCalibration = ({ onStop }: { onStop: () => void }) => {
    function stopCalibration() {
        GazeCloudAPI.StopEyeTracking();
        onStop()
    }

    function startCalibration() {
        GazeCloudAPI.StartEyeTracking();
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
                    <Button variant="contained" color="primary" onClick={startCalibration}>
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
        <Stack spacing={1} sx={{ maxWidth: '800px' }}>
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
    [14, 15],
    [12, 13],
    [10, 11],
    [8, 9],
    [6, 7],
    [4, 5],
    [2, 3],
    [0, 1],
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
            setShownCharacters([trolleyCharactersData[pair[0]], trolleyCharactersData[pair[1]]]);
        }
    }, [currentPairIndex]);

    function characterSelected(character: Character, index: number) {
        characterSaved(index);
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

    async function generateTrolleyProblemAgent(clickedChars: Character[]) {

        const description: string = clickedChars.map(character => character.generateDisplayDescription()).join(' ');

        const scenarios = trolleyProblemCharacterPairings.map(pair => {
            const char1 = charactersData[pair[0]];
            const char2 = charactersData[pair[1]];
            return `A trolley is coming and there are two tracks it can take, and both have a character standing on it. Based on the types of characters you generally like, who would you save between ${char1.generateDisplayDescription().replace('.', '')} and ${char2.generateDisplayDescription().replace('.', '')}? It doesn't matter if the characters don't match your predilections exactly, pick the most similar.`;
        });

        const fetchScenario = async (scenario: string) => {
            const response = await fetch('https://cdp-zine-9f7edc748580.herokuapp.com/trolley-problem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: description,
                    scenarios: [scenario]
                })
            });

            return response.json();
        };

        const responses = await Promise.all(scenarios.map(fetchScenario));

        const decisions = responses.flatMap(resp => resp.decisions.map((d: { decision: number }) => d.decision));
        const justifications = responses.flatMap(resp => resp.decisions.map((d: { justification: any }) => d.justification));

        setAiSaveDecisions(decisions);
        setAiJustifications(justifications);
    }

    const handleTrainingClick = (index: number) => {
        const clickedCharacter = characters[index];

        console.log('clicked character: ', clickedCharacter, '  index: ', index)

        // Keep track of clicked characters in state, ensuring no duplicates
        setClickedCharacters(prevClickedCharacters => {
            if (!prevClickedCharacters.some(char => char.id === clickedCharacter.id)) {
                return [...prevClickedCharacters, clickedCharacter];
            }
            return prevClickedCharacters;
        });

        // Training complete, transition to next phase
        if (clickedCharacters.length > 10) {
            setAppState(states.TROLLEY);
            generateTrolleyProblemAgent(clickedCharacters);
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
            console.log('matching characters: ', matchingCharacters)
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

    const [gazeStartTime, setGazeStartTime] = useState<{ [key: number]: number }>({});

    function handleCardGaze(index: number) {
        const currentTime = Date.now();
        setGazeStartTime(prevGazeStartTime => {
            const newGazeStartTime = { ...prevGazeStartTime };
            if (!newGazeStartTime[index]) {
                newGazeStartTime[index] = currentTime;
            } else {
                const gazeDuration = currentTime - newGazeStartTime[index];
                if (gazeDuration > 300) {
                    handleTrainingClick(index);
                    delete newGazeStartTime[index]; // Reset the gaze start time after triggering
                }
            }
            return newGazeStartTime;
        });
    }

    function PlotGaze(GazeData: any) {
        /*
            GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
            GazeData.docX // gaze x in document coordinates
            GazeData.docY // gaze y in document cordinates
            GazeData.time // timestamp
        */
        
        const x = GazeData.docX;
        const y = GazeData.docY;
        // console.log('Gaze coordinates:', x, y);

        if (GazeData.state === 0) {
            const cards = document.querySelectorAll('.MuiCard-root');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    card.style.transform = 'scale(0.9)';
                    handleCardGaze(index);
                } else {
                    card.style.transform = 'scale(1)';
                    setGazeStartTime(prevGazeStartTime => {
                        const newGazeStartTime = { ...prevGazeStartTime };
                        delete newGazeStartTime[index]; // Reset the gaze start time if gaze is not over the card
                        return newGazeStartTime;
                    });
                }
            });
        }
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
                setTimeout(() => {
                    setClickedCharacters((prevClickedCharacters) => {
                        console.log('55 seconds have passed, triggering function');
                        console.log('selected: ', prevClickedCharacters);
                        setAppState(states.TROLLEY);
                        generateTrolleyProblemAgent(prevClickedCharacters);
                        setQueue([]); // stop generating new images
                        GazeCloudAPI.StopEyeTracking();
                        return prevClickedCharacters;
                    });
                }, 55000);
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
            height="80vh"
            margin="0 auto"
            overflow="hidden"
        >
            {appState === states.CALIBRATION && <PreCalibration onStop={handleCalibrationOptOut} />}
            {appState === states.TRAINING && <CharacterGrid chars={characters} onImageClick={handleTrainingClick} clickMode={clickMode} />}
            {appState === states.TROLLEY && <TrolleyProblem characterSaved={handleTrolleyClick} onComplete={handleTrolleyComplete} />}
            {appState === states.REVIEW
            && <Review characters={trolleyCharactersData}
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
