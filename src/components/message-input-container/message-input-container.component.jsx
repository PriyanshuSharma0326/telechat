import React from 'react';
import './message-input-container.style.scss';
import SendIcon from '@mui/icons-material/Send';

function MessageInputContainer() {
    return (
        <div className='message-input-container'>
            <input type="text" placeholder='Type your message' />

            <div className="send-icon">
                <SendIcon />
            </div>
        </div>
    )
}

export default MessageInputContainer;
