import React, { useContext } from 'react';
import './chat-container.style.scss';
import ChatSectionHeader from '../chat-section-header/chat-section-header.component';
import MessageInputContainer from '../message-input-container/message-input-container.component';
import { StyleContext } from '../../context/style-context';
import MessagesContainer from '../messages-container/messages-container.component';
import { ChatContext } from '../../context/chat-context';
import ContextMenu from '../context-menu/context-menu.component';
import ConfirmationBox from '../confirmation-box/confirmation-box.component';

function ChatContainer() {
    const { darkMode } = useContext(StyleContext);
    const { selectedChat, showContextMenu, showDeleteConfirmBox } = useContext(ChatContext);

    return (
        <div className={`chat-container${darkMode ? ' dark-mode' : ''}`}>
            {selectedChat.chatID?.length ? <ChatSectionHeader /> : <></>}

            <MessagesContainer />

            {selectedChat.chatID?.length ? <MessageInputContainer /> : <></>}

            {showContextMenu && <ContextMenu />}

            {showDeleteConfirmBox && <ConfirmationBox />}
        </div>
    )
}

export default ChatContainer;
