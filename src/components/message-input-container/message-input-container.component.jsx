import React, { useContext, useState } from 'react';
import './message-input-container.style.scss';
import SendIcon from '@mui/icons-material/Send';
import { StyleContext } from '../../context/style-context';
import { ChatContext } from '../../context/chat-context';
import { UserContext } from '../../context/user-context';
import { addMessageToCollections } from '../../lib/utils/firebase.utils';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function MessageInputContainer() {
    const { darkMode } = useContext(StyleContext);
    const { selectedChat } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);

    const [messageText, setMessageText] = useState('');

    const [messageImage, setMessageImage] = useState('');

    const handleMessageChange = (e) => {
        setMessageText(e.target.value);
    }

    const handleSend = async () => {
        if(messageText.length) {
            await addMessageToCollections(selectedChat, currentUser, messageText);
        }
        setMessageText('');
    }

    const handleEnter = async (e) => {
        if(e.key === 'Enter') {
            if(messageText.length) {
                await addMessageToCollections(selectedChat, currentUser, messageText);
            }
            setMessageText('');
        }
    }

    return (
        <div className={`message-input-container ${darkMode && 'dark-mode'}`}>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder='Type your message' 
                    onKeyDown={handleEnter} 
                    onChange={handleMessageChange} 
                    value={messageText} 
                />

                {!messageImage ? 
                    <div className="attach-file-icon">
                        <AttachFileIcon />
                    </div> :
                    <div className="check-circle-icon">
                        <CheckCircleIcon />
                    </div>
                }
            </div>

            <div className="send-icon">
                <SendIcon 
                    onClick={handleSend} 
                />
            </div>
        </div>
    )
}

export default MessageInputContainer;
