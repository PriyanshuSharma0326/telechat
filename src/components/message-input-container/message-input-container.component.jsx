import React, { useContext } from 'react';
import './message-input-container.style.scss';
import SendIcon from '@mui/icons-material/Send';
import { StyleContext } from '../../context/style-context';

function MessageInputContainer() {
    const { darkMode } = useContext(StyleContext);

    return (
        <div className={`message-input-container ${darkMode && 'dark-mode'}`}>
            <input type="text" placeholder='Type your message' />

            <div className="send-icon">
                <SendIcon />
            </div>
        </div>
    )
}

export default MessageInputContainer;
