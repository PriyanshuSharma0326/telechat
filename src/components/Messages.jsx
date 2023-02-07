import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChatContext } from '../context/ChatContext';
import { db } from '../lib/config/firebase';
import Text from './Text';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return unsubscribe;
    }, [data.chatId]);

    return (
        <MessagesContainer>
            {messages?.map((msg) => (
                <Text message={msg} key={msg.id} />
            ))}
        </MessagesContainer>
    );
}

const MessagesContainer = styled.div`
    background-color: #181818;
    padding: 10px;
    height: calc(100% - 160px);
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;
