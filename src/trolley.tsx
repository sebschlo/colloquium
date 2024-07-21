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
    onCharacterPress: (character: Character) => void 
}) => {
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const handleCharacterClick = (character: Character) => {
        onCharacterPress(character);
    };

    return (
        <Stack justifyContent="center" alignItems="center" spacing={14} sx={{ width: 600 }}>
            {characters.map((character) => (
                <Card
                    key={character.id}
                    onClick={() => handleCharacterClick(character)}
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