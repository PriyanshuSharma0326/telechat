import React from 'react'
import styled from 'styled-components';
import Messages from './Messages';
import ChatInput from './ChatInput';

import DuoIcon from '@mui/icons-material/Duo';
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function ChatPanel() {
    return (
        <ChatPanelContainer>
            <ChatInfo>
                <span>Jane</span>
                <ChatIcons>
                    <DuoIcon />
                    <CallIcon />
                    <MoreVertIcon />
                </ChatIcons>
            </ChatInfo>

            <Messages />

            <ChatInput />
        </ChatPanelContainer>
    );
}

const ChatPanelContainer = styled.div`
    flex: 2;
    border-left: 1px solid gray;
`;

const ChatInfo = styled.div`
    height: 50px;
    padding: 10px;
    background-color: #202C33;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`;

const ChatIcons = styled.div`
    display: flex;
    gap: 20px;

    .MuiSvgIcon-root {
        font-size: 24px;
        cursor: pointer;
    }
`;
