import React from 'react'
import styled from 'styled-components';
import { auth } from '../lib/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Navbar() {
    const [user] = useAuthState(auth);

    return (
        <NavbarContainer>
            <img src={user?.photoURL} alt='user-logo' />
            <UserContainer>
                <span>{user?.displayName}</span>
                <button
                    onClick={() => {
                        auth.signOut();
                    }}
                >Logout</button>
            </UserContainer>
        </NavbarContainer>
    );
}

const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #202C33;
    height: 50px;
    padding: 10px;
    justify-content: space-between;
    color: #181818;

    > img {
        background-color: #181818;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const UserContainer = styled.div`
    display: flex;
    gap: 10px;
    color: white;

    > button {
        background-color: white;
        color: #181818;
        font-size: 12px;
        border-radius: 3px;
        border: none;
        outline: none;
        cursor: pointer;

        :hover {
            background-color: whitesmoke;
        }
    }
`;
