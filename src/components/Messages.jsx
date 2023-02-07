import React from 'react';
import styled from 'styled-components';
import Text from './Text';

export default function Messages() {
    return (
        <MessagesContainer>
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
        </MessagesContainer>
    );
}

const MessagesContainer = styled.div`
    /* background-color: #222E35; */
    background-color: #181818;
    padding: 10px;
    height: calc(100% - 160px);
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;
