import React, { useContext } from 'react';
import './message.style.scss';
import { StyleContext } from '../../context/style-context';
import { UserContext } from '../../context/user-context';
import { ChatContext } from '../../context/chat-context';
import { formatTime } from '../../lib/utils/utils';

function Message({ message }) {
    const { darkMode } = useContext(StyleContext);
    const { currentUser } = useContext(UserContext);
    const { selectedChat } = useContext(ChatContext);

    return (
        <div className={`message-container${darkMode ? ' dark-mode' : ''}${message.senderID === currentUser.uid ? ' owner' : ''}`}>
            {message.messageImageURL && <div className="message-media-container">
                <img src={message.messageImageURL} alt="" />
            </div>}

            {message.messageText && <div className="message-text">    
                <p>{message.messageText}</p>

                <h2 className='timestamp'>{formatTime(message.date)}</h2>
            </div>}

            <div className="user-image">
                <img src={message.senderID === currentUser.uid ? currentUser.photoURL : selectedChat.userInfo.photoURL} alt="" />
            </div>
        </div>
    )
}

export default Message;
