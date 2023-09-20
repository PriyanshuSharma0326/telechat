import React, { useContext } from 'react';
import './chat-container.style.scss';
import ChatSectionHeader from '../chat-section-header/chat-section-header.component';
import MessageInputContainer from '../message-input-container/message-input-container.component';
import { StyleContext } from '../../context/style-context';
import MessagesContainer from '../messages-container/messages-container.component';

function ChatContainer() {
    const { darkMode } = useContext(StyleContext);

    return (
        <div className={`chat-container${darkMode ? ' dark-mode' : ''}`}>
            <ChatSectionHeader />

            <MessagesContainer />

            <MessageInputContainer />
        </div>
    )
}

export default ChatContainer;
