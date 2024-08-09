import React from 'react';
import LoopIcon from '@mui/icons-material/Loop';
import Paper from '@mui/material/Paper';

export const SystemPanel: React.FC = () => {
    return (
        <div>
            <Paper className="message-paper">
                <h4>Digital World mediating interactions with the Built Environment</h4>
            </Paper>

            <br />
            <LoopIcon className="center-icon" />
            <br />
            <br />
            <Paper className="message-paper">
                <h4>Built environment mediating navigation and social interactions</h4>
            </Paper>
            <br />
            <LoopIcon className="center-icon" />
            <br />
            <br />
            <Paper className="message-paper">
                <h4>Built environment mediating digital interactions</h4>
            </Paper>
        </div>
    )
}



export const MethodsPanel: React.FC = () => {
    return (
        <div>
            <h2>Developing Methods</h2>
            <br></br>
            <hr></hr>
            <br></br>
            <p>In order to tackle this problem space in the Fall and Spring, I dedicated this term to exploring new methods in order to build a foundation. My aim was to learn new tools specifically focused on spatial design and analysis, to learn visual communication, and to build the conceptual foundation of my practice.</p>
        </div>
    )
}