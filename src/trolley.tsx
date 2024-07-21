import React, { useState } from 'react';
import { Box, Stack, Card, CardMedia, Typography, CardContent, Grid } from '@mui/material';
import { Character } from './zine'

const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.boxShadow = '0 8px 8px rgba(0, 0, 0, 0.2)';
    card.style.transition = 'box-shadow 0.2s';
};

const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.boxShadow = 'none';
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
        <Stack justifyContent="center" alignItems="center" spacing={8} sx={{ width: 600 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Who would you save from the trolley?
            </Typography>
            {characters.map((character, index) => (
                <Card
                    key={character.id}
                    onClick={() => handleCharacterClick(character, index)}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    sx={{ display: 'flex' }}
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
    );
};

export default TrolleyProblemUI;