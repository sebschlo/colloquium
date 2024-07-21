import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, Typography, Box, CardContent, IconButton, Backdrop, CircularProgress, Popover } from '@mui/material';
import { Character } from './zine';
import CloseIcon from '@mui/icons-material/Close';

interface ReviewProps {
    characters: Character[];
    trolleyPairings: [number, number][];
    decisions: number[];
    aiDecisions: number[];
    justifications: string[];
}

const Review = ({ characters, trolleyPairings, decisions, aiDecisions, justifications }: ReviewProps) => {
    const [showText, setShowText] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverContent, setPopoverContent] = useState<string>('');
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, content: string) => {
        console.log('showing popover')
        setAnchorEl(event.currentTarget);
        setPopoverContent(content);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverContent('');
    };

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
                                        border: !showText || Boolean(aiDecisions[index]) ? 'none':  '4px solid blue'
                                    }}
                                    onMouseEnter={(event) => {
                                        if (showText && !Boolean(aiDecisions[index])) handlePopoverOpen(event, justifications[index]);
                                    }}
                                    // onMouseLeave={handlePopoverClose}
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
                                        border: !showText || (showText && !Boolean(aiDecisions[index])) ? 'none' : '4px solid blue'
                                    }}
                                    onMouseEnter={(event) => {
                                        if (showText && Boolean(aiDecisions[index])) handlePopoverOpen(event, justifications[index]);
                                    }}
                                    // onMouseLeave={handlePopoverClose}
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
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box sx={{ p: 2, position: 'relative', paddingTop: 6 }}>
                            <IconButton
                                aria-label="close"
                                onClick={handlePopoverClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography>{popoverContent}</Typography>
                        </Box>
                    </Popover>
                </>
            )}
        </Box>
    );
};

export default Review;