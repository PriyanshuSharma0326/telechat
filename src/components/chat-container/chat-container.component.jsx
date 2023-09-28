import React, { useContext } from 'react';
import './chat-container.style.scss';
import ChatSectionHeader from '../chat-section-header/chat-section-header.component';
import MessageInputContainer from '../message-input-container/message-input-container.component';
import { StyleContext } from '../../context/style-context';
import MessagesContainer from '../messages-container/messages-container.component';
import { ChatContext } from '../../context/chat-context';

function ChatContainer() {
    const { darkMode } = useContext(StyleContext);
    const { selectedChat } = useContext(ChatContext);

    return (
        <div className={`chat-container${darkMode ? ' dark-mode' : ''}`}>
            {selectedChat.chatID?.length ? <ChatSectionHeader /> : <></>}

            <MessagesContainer />

            {selectedChat.chatID?.length ? <MessageInputContainer /> : <></>}
        </div>
    )
}

export default ChatContainer;
