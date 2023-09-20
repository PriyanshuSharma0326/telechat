import React from 'react';
import './messages-container.style.scss';
import Message from '../message/message.component';

function MessagesContainer() {
    return (
        <div className="messages-container">
            <Message 
                messageText="Hello there mate!" 
            />
        </div>
    )
}

export default MessagesContainer;
