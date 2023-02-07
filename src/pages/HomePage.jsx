import React, { useContext } from 'react'
import styled from 'styled-components';
import BlankPanel from '../components/BlankPanel';
import ChatPanel from '../components/ChatPanel';
import Sidebar from '../components/Sidebar';
import { ChatContext } from '../context/ChatContext';

export default function HomePage() {
    const { data } = useContext(ChatContext);

    return (
        <AppBody>
            <HomePageContainer>
                <Sidebar />

                {data ? <BlankPanel /> : <ChatPanel />}
            </HomePageContainer>
        </AppBody>
    );
}

const HomePageContainer = styled.div`
    border: 1px solid #181818;
    border-radius: 10px;
    width: 65%;
    height: 80%;
    display: flex;
    overflow: hidden;
`;

const AppBody = styled.div`
    background-color: #128C7E;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
