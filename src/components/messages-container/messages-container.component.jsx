import React, { useContext } from 'react';
import './messages-container.style.scss';
import Message from '../message/message.component';
import { ChatContext } from '../../context/chat-context';

function MessagesContainer() {
    const { chatMessages } = useContext(ChatContext);

    return (
        <div className="messages-container">
            {chatMessages.map(msg => {
                return (
                    <Message 
                        key={msg.id} 
                        message={msg} 
                    />
                )
            })}
        </div>
    )
}

export default MessagesContainer;
