import React from 'react';
import './chat-container.style.scss';
import ChatSectionHeader from '../chat-section-header/chat-section-header.component';
import MessageInputContainer from '../message-input-container/message-input-container.component';

function ChatContainer() {
    return (
        <div className='chat-container'>
            <ChatSectionHeader />

            <MessageInputContainer />
        </div>
    )
}

export default ChatContainer;
