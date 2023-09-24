import React, { useContext } from 'react';
import './message.style.scss';
import { StyleContext } from '../../context/style-context';
import { UserContext } from '../../context/user-context';
import { ChatContext } from '../../context/chat-context';

function Message({ message }) {
    const { darkMode } = useContext(StyleContext);
    const { currentUser } = useContext(UserContext);
    const { selectedChat } = useContext(ChatContext);

    return (
        <div className={`message-container${darkMode ? ' dark-mode' : ''}${message.senderID === currentUser.uid ? ' owner' : ''}`}>
            <div className="message-text">
                {message.messageImageURL && <div className="message-media-container">
                    <img src={message.messageImageURL} alt="" />
                </div>}
    
                {message.messageText && <p>{message.messageText}</p>}
            </div>

            <div className="user-image">
                <img src={message.senderID === currentUser.uid ? currentUser.photoURL : selectedChat.userInfo.photoURL} alt="" />
            </div>
        </div>
    )
}

export default Message;
