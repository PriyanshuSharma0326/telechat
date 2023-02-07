import React, { useContext, useState } from 'react'
import styled from 'styled-components';

import AttachmentIcon from '@mui/icons-material/Attachment';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../lib/config/firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function ChatInput() {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if(image) {
            const storageRef = ref(storage, uuid());

            await uploadBytesResumable(storageRef, image).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'chats', data.chatId), {
                        messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            image: downloadURL
                        })
                    });
                });
            });
        }
        
        else if(text !== '') {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            });
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text
            },
            [data.chatId + '.date']: serverTimestamp()
        });
        
        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text
            },
            [data.chatId + '.date']: serverTimestamp()
        });

        setText('');
        setImage(null);
    }

    const handleEnterButton = (e) => {
        (e.code === 'Enter') && handleSend();
    }

    return (
        <ChatInputContainer>
            <input onKeyDown={handleEnterButton} value={text} onChange={(e) => setText(e.target.value)} type='text' placeholder='Type something here...' />

            <Send>
                <AttachmentIcon />

                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='fileUpload' />

                <label htmlFor='fileUpload'>
                    <ImageIcon />
                </label>

                <button onClick={handleSend}>
                    <SendIcon />
                </button>
            </Send>
        </ChatInputContainer>
    );
}

const ChatInputContainer = styled.div`
    height: 50px;
    background-color: #2A3942;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > input {
        background-color: #2A3942;
        width: 100%;
        border: none;
        outline: none;
        color: #D1D7DB;
        font-size: 16px;

        ::placeholder {
            color: #8696A0;
        }
    }
`;

const Send = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    .MuiSvgIcon-root {
        font-size: 22px;
        cursor: pointer;
        color: #8696A0;
    }

    > button {
        background-color: #128C7E;
        border: none;
        outline: none;
        border-radius: 50%;
        display: flex;
        height: 36px;
        width: 36px;
        cursor: pointer;

        .MuiSvgIcon-root {
            color: white;
            margin: auto;
            padding-left: 2px;
            padding-top: 1px;
        }
    }

    #fileUpload {
        display: none;
    }
`;
