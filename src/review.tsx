import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, Typography, Box, CardContent, Divider, Backdrop, CircularProgress } from '@mui/material';
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
    const text = showText ? 'What AI decided for you...' : 'Your conscious decisions';
    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            {aiDecisions.length === 0 ? (
                <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <>
                    <Typography variant="h3" align="center" sx={{ marginBottom: 2 }}>
                        {text}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">You saved</Typography>
                        </Grid>
                        {savedCharacters.map((character, index) => (
                            <Grid item xs key={index} wrap="nowrap">
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        image={character.img}
                                        alt={`Saved Character ${index + 1}`}
                                        sx={{ height: 100, filter: !showText || (showText && aiDecisions[index]) ? 'none' : 'grayscale(100%)' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
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
                            <Divider sx={{ marginY: 2 }} />
                        </Grid>

                        {killedCharacters.map((character, index) => (
                            <Grid item xs key={index} wrap="nowrap">
                                <Card>
                                    <CardMedia
                                        component="img"
                                        image={character.img}
                                        alt={`Killed Character ${index + 1}`}
                                        sx={{ height: 100, filter: !showText || (showText && aiDecisions[index]) ? 'grayscale(100%)' : 'none' }}
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
                </>
            )}
        </Box>
    );
};

export default Review;