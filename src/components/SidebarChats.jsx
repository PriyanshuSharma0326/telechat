import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../lib/config/firebase';

export default function SidebarChats() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsubscribe();
            };
        }

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };

    return (
        <SidebarChatsContainer>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <UserChat 
                    key={chat[0]} 
                    onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <img src={chat[1].userInfo?.photoURL} alt='' />
                    
                    <UserChatInfo>
                        <span>{chat[1].userInfo?.displayName}</span>

                        <p>{chat[1].lastMessage?.text}</p>
                    </UserChatInfo>
                </UserChat>
            ))}
        </SidebarChatsContainer>
    );
}

const SidebarChatsContainer  = styled.div`
`;

const UserChat = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    :hover {
        background-color: #2A3942;
    }
`;

const UserChatInfo = styled.div`
    color: #D1D7DB;

    > span {
        font-size: 14px;
        font-weight: 500;
    }

    > p {
        font-size: 12px;
        color: #8696A0;
    }
`;
