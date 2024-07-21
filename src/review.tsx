import { Grid, Card, CardMedia, Typography, Box, CardContent } from '@mui/material';
import { Character } from './zine';

interface ReviewProps {
    characters: Character[];
    trolleyPairings: [number, number][];
    decisions: number[];
}

const Review = ({ characters, trolleyPairings, decisions }: ReviewProps) => {
    const savedCharacters = trolleyPairings.map((pair, i) => characters[pair[decisions[i]]]);
    const killedCharacters = trolleyPairings.map((pair, i) => {
        const savedIndex = decisions[i] ? pair[1] : pair[0];
        return characters[pair.find(index => index !== savedIndex)!];
    });

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">You saved:</Typography>
                </Grid>
                {savedCharacters.map((character, index) => (
                    <Grid item xs={2} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={character.img}
                                alt={`Saved Character ${index + 1}`}
                                sx={{ height: 100, width: 100 }}
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
                    <Typography variant="h6">You killed:</Typography>
                </Grid>
                {killedCharacters.map((character, index) => (
                    <Grid item xs={2} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={character.img}
                                alt={`Killed Character ${index + 1}`}
                                sx={{ height: 100, width: 100, filter: 'grayscale(100%)' }}
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
            </Grid>
        </Box>
    );
};

export default Review;