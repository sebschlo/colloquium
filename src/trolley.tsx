import React, { useState } from 'react';
import { Box, Stack, Card, CardMedia, Typography, CardContent, Grid } from '@mui/material';
import { Character } from './zine'

const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.boxShadow = '0 8px 8px rgba(255, 255, 255, 0.5)';
    card.style.transition = 'box-shadow 0.2s';
};

const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 1)';
};


const TrolleyProblemUI = ({
    characters,
    onCharacterPress
}: {
    characters: Character[],
    onCharacterPress: (character: Character, index: number) => void
}) => {
    const handleCharacterClick = (character: Character, index: number) => {
        onCharacterPress(character, index);
    };

    return (

        <Stack justifyContent="center" alignItems="center" spacing={4}>
            <Typography variant="h4" align="center" gutterBottom>
                Who would you save from the trolley?
            </Typography>
            <Box
                sx={{
                    backgroundImage: 'url(/TrainBG.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '70vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                <Stack justifyContent="center" alignItems="center" spacing={4} sx={{ width: 500 }}>
                {characters.map((character, index) => (
                    <Card
                        key={character.id}
                        onClick={() => handleCharacterClick(character, index)}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        sx={{ display: 'flex', boxShadow: '0 4px 8px rgba(0, 0, 0, 1)' }}
                    >
                        <Grid container>
                            <Grid item xs={7}>
                                <CardContent>
                                    <Typography variant="h5" align="left">
                                        {character.generateDisplayDescription()}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item xs={5}>
                                <CardMedia
                                    component="img"
                                    image={character.img}
                                    alt={`Character ${character.id}`}
                                    sx={{ height: 256, width: 256 }}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                ))}
                </Stack>
            </Box>
        </Stack>

    );
};

export default TrolleyProblemUI;