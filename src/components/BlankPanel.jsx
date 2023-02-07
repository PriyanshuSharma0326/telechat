import React from 'react'
import styled from 'styled-components';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';

export default function BlankPanel() {return (
        <ChatPanelContainer>
            <ContentContainer>
                <HourglassEmptyRoundedIcon />

                <h3>Start chatting now...</h3>
            </ContentContainer>
        </ChatPanelContainer>
    );
}

const ChatPanelContainer = styled.div`
    flex: 2;
    border-left: 1px solid gray;
    background-color: #202C33;
    display: flex;
`;

const ContentContainer = styled.div`
    margin: auto;
    text-align: center;

    .MuiSvgIcon-root {
        font-size: 100px;
        color: whitesmoke;
    }

    > h3 {
        margin-top: 20px;
        font-size: 18px;
        color: whitesmoke;
    }
`;

