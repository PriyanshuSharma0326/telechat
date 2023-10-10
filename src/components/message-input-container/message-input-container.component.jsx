import React, { useContext, useEffect, useState } from 'react';
import './message-input-container.style.scss';
import SendIcon from '@mui/icons-material/Send';
import { StyleContext } from '../../context/style-context';
import { ChatContext } from '../../context/chat-context';
import { UserContext } from '../../context/user-context';
import { addMessageToCollections, addMessageWithImageToCollections, updateMessage } from '../../lib/utils/firebase.utils';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';

function MessageInputContainer() {
    const { darkMode } = useContext(StyleContext);
    const { selectedChat, editing, selectedMessage, setSelectedMessage, setEditing } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);

    const [messageText, setMessageText] = useState('');

    const [messageImage, setMessageImage] = useState('');

    const handleMessageChange = (e) => {
        setMessageText(e.target.value);
    }

    useEffect(() => {
        if(editing) {
            setMessageText(selectedMessage?.messageText);
        }
    }, [editing]);

    useEffect(() => {
        if(!messageText?.length && editing) {
            setEditing(false);
            setSelectedMessage({});
        }
    }, [messageText]);

    useEffect(() => {
        setMessageText('');
    }, [selectedChat]);

    const handleSend = async () => {
        if(!editing) {
            if(messageText.length) {
                if(messageImage) {
                    await addMessageWithImageToCollections(selectedChat, currentUser, messageText, messageImage);
                }
                else {
                    await addMessageToCollections(selectedChat, currentUser, messageText);
                }
            }
            else {
                if(messageImage) {
                    await addMessageWithImageToCollections(selectedChat, currentUser, messageText, messageImage);
                }
            }
        }
        else {
            const newMesssage = {
                id: selectedMessage.id,
                messageText,
                senderID: selectedMessage.senderID,
                date: selectedMessage.date,
                messageImageURL: selectedMessage?.messageImageURL ? selectedMessage?.messageImageURL : ''
            }
            await updateMessage(selectedChat, currentUser, selectedMessage, newMesssage);
        }
        setMessageText('');
        setMessageImage('');
    }

    const handleEnter = async (e) => {
        if(e.key === 'Enter') {
            if(!editing) {
                if(messageText.length) {
                    if(messageImage) {
                        await addMessageWithImageToCollections(selectedChat, currentUser, messageText, messageImage);
                    }
                    else {
                        await addMessageToCollections(selectedChat, currentUser, messageText);
                    }
                }
                else {
                    if(messageImage) {
                        await addMessageWithImageToCollections(selectedChat, currentUser, messageText, messageImage);
                    }
                }
            }
            else {
                const newMesssage = {
                    id: selectedMessage.id,
                    messageText,
                    senderID: selectedMessage.senderID,
                    date: selectedMessage.date,
                    messageImageURL: selectedMessage?.messageImageURL ? selectedMessage?.messageImageURL : ''
                }
                await updateMessage(selectedChat, currentUser, selectedMessage, newMesssage);
            }
            setMessageText('');
            setMessageImage('');
        }
    }

    const setInputImage = (e) => {
        setMessageImage(e.target.files[0]);
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

                {!editing && <>
                    {!messageImage ? 
                        <div className="image-input-group">
                            <label className="attach-file-icon" htmlFor='message-image'>
                                <AttachFileIcon />
                            </label>
                            <input type='file' id='message-image' onChange={setInputImage} />
                        </div> : 
                        <div className="check-circle-icon">
                            <CancelIcon 
                                onClick={() => setMessageImage('')} 
                            />
                        </div>
                    }
                </>}
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
