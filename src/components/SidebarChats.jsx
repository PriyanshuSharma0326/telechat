import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function SidebarChats() {
    // const [chats, setChats] = useState([]);

    // useEffect(() => {

    // }, []);

    return (
        <SidebarChatsContainer>
            <UserChat>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/800px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png' alt='user1' />
                <UserChatInfo>
                    <span>Jane</span>
                    <p>Hello</p>
                </UserChatInfo>
            </UserChat>

            {/* <UserChat>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/800px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png' alt='user1' />
                <UserChatInfo>
                    <span>Jane</span>
                    <p>Hello</p>
                </UserChatInfo>
            </UserChat>

            <UserChat>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/800px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png' alt='user1' />
                <UserChatInfo>
                    <span>Jane</span>
                    <p>Hello</p>
                </UserChatInfo>
            </UserChat>

            <UserChat>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/800px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png' alt='user1' />
                <UserChatInfo>
                    <span>Jane</span>
                    <p>Hello</p>
                </UserChatInfo>
            </UserChat> */}
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
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }

    :hover {
        background-color: #2A3942;
    }
`;

const UserChatInfo = styled.div`
    color: #D1D7DB;

    > span {
        font-weight: 500;
    }

    > p {
        font-size: 12px;
        color: #8696A0;
    }
`;
