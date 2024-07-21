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

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            {aiDecisions.length === 0 ? (
                <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <>
                    <Typography variant="h3" align="center" sx={{ marginBottom: 2 }}>
                        Results
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">You Saved</Typography>
                        </Grid>
                        {savedCharacters.map((character, index) => (
                            <Grid item xs key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: !showText || (showText && !aiDecisions[index]) ? 'none':  '4px solid blue'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={character.img}
                                        alt={`Saved Character ${index + 1}`}
                                        sx={{ height: 100 }}
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
                            <Typography variant="h6">You Sacrificed</Typography>
                        </Grid>
                        {killedCharacters.map((character, index) => (
                            <Grid item xs key={index}>
                                <Card
                                    sx={{
                                        border: !showText || (showText && aiDecisions[index]) ? 'none' : '4px solid blue'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={character.img}
                                        alt={`Killed Character ${index + 1}`}
                                        sx={{ height: 100, filter: 'grayscale(100%)' }}
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
                        {showText && <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, marginLeft: 2 }}>
                            <Box sx={{ width: 20, height: 20, backgroundColor: 'blue', marginRight: 1 }} />
                            <Typography sx={{ color: 'blue'  }}>
                                = Who the AI decided to save on your behalf
                            </Typography>
                        </Box>}
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default Review;