import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, Typography, Box, CardContent, Divider } from '@mui/material';
import { Character } from './zine';

interface ReviewProps {
    characters: Character[];
    trolleyPairings: [number, number][];
    decisions: number[];
    aiDecisions: number[];
}

const Review = ({ characters, trolleyPairings, decisions, aiDecisions }: ReviewProps) => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const savedCharacters = trolleyPairings.map((pair, i) => characters[pair[decisions[i]]]);
    const killedCharacters = trolleyPairings.map((pair, i) => {
        const savedIndex = decisions[i] ? pair[1] : pair[0];
        return characters[pair.find(index => index !== savedIndex)!];
    });
    const text = showText ? 'AI decisions made on your behalf' : 'Your conscious decisions';
    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h3" align="center" sx={{ marginBottom: 2 }}>
                {text}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">You saved</Typography>
                </Grid>
                {savedCharacters.map((character, index) => (
                    <Grid item xs={2} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={character.img}
                                alt={`Saved Character ${index + 1}`}
                                sx={{ height: 100, width: 100, filter: !showText || (showText && aiDecisions[index]) ? 'none' : 'grayscale(100%)' }}
                            />
                            <Typography variant="body2" align="center">
                                {character.adjective}<br />
                                {character.species}<br />
                                {character.profession}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Divider sx={{ marginY: 2 }} />
                </Grid>

                {killedCharacters.map((character, index) => (
                    <Grid item xs={2} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={character.img}
                                alt={`Killed Character ${index + 1}`}
                                sx={{ height: 100, width: 100, filter: !showText || (showText && aiDecisions[index]) ? 'grayscale(100%)' : 'none' }}
                            />
                            <CardContent>
                                <Typography variant="body2" align="center">
                                    {character.adjective}<br />
                                    {character.species}<br />
                                    {character.profession}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Typography variant="h6">You sacrificed</Typography>
                </Grid>
            </Grid>
            <Typography align="center" sx={{ marginTop: 20 }}>
                While you were observing the characters in the previous stage, and AI was trained to develop a bias based on these elections. Then it was asked to decide which characters to save at the same time you were deciding.
            </Typography>
        </Box>
    );
};

export default Review;