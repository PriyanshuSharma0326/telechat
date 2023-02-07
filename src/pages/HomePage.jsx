import styled from 'styled-components';
import ChatPanel from '../components/ChatPanel';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
    return (
        <AppBody>
            <HomePageContainer>
                <Sidebar />

                {/* <BlankPanel /> */}
                <ChatPanel />
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
