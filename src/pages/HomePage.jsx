import React from 'react'
import styled from 'styled-components';
import ChatPanel from '../components/ChatPanel';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
    return (
        <HomePageContainer>
            <Sidebar />

            <ChatPanel />
        </HomePageContainer>
    );
}

const HomePageContainer = styled.div`
    border: 1px solid white;
    border-radius: 10px;
    width: 65%;
    height: 80%;
    display: flex;
    overflow: hidden;
`;
