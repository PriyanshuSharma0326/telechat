import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export default function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    const timestamp = message.date.toDate().getTime();
    const messageTime = new Date(timestamp).toLocaleTimeString('en-IN', { hour: "2-digit", minute: "2-digit" });

    // const timeNow =Timestamp.now().toDate().getTime();
    // var diffInMillis = timeNow - timestamp;

    return (
        <TextContainer ref={ref} className={`${message.senderId === currentUser.uid && 'owner'}`}>
            <TextInfo>
                <img 
                    src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} 
                    alt=''
                />

                <span>{messageTime}</span>
            </TextInfo>

            <TextContent className='messageContent'>
                {message.text && <p>{message.text}</p>}
                {message.image && <img src={message.image} alt='' />}
            </TextContent>
        </TextContainer>
    );
}

const TextContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    &.owner {
        flex-direction: row-reverse;

        .messageContent {
            align-items: flex-end;

            > p {
                background-color: #128C7E;
                color: #E9EDEF;
                padding: 10px 20px;
                border-radius: 10px 0 10px 10px;
            }

            > img {
                border: 12px solid #128C7E;
                border-radius: 10px 0 10px 10px;
                width: 50%;
            }
        }
    }
`;

const TextInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;

    > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const TextContent = styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > p {
        background-color: #202C33;
        color: #E9EDEF;
        padding: 10px 20px;
        border-radius: 0 10px 10px 10px;
        max-width: max-content;
    }

    > img {
        border: 12px solid #202C33;
        border-radius: 0 10px 10px 10px;
        width: 50%;
    }
`;

