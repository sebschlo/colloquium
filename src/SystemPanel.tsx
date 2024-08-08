import React from 'react';
import LoopIcon from '@mui/icons-material/Loop';
import Paper from '@mui/material/Paper';

const SystemPanel: React.FC = () => {
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

export default SystemPanel;