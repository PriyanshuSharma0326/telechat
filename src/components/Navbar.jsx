import React, { useContext } from 'react'
import styled from 'styled-components';
import { auth } from '../lib/config/firebase';
import { AuthContext } from '../context/AuthContext';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Navbar() {
    const { currentUser } = useContext(AuthContext);

    return (
        <NavbarContainer>
            <img src={currentUser?.photoURL} alt='user-logo' />
            <UserContainer>
                <span>{currentUser?.displayName}</span>
                <button onClick={() => {auth.signOut();}}>
                    <LogoutOutlinedIcon />
                </button>
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
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const UserContainer = styled.div`
    display: flex;
    gap: 10px;
    color: white;

    > span {
        display: none;

        @media (min-width: 800px) {
            display: flex;
        }
    }

    > button {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 12px;
        border-radius: 3px;
        display: flex;

        .MuiSvgIcon-root {
            font-size: 24px;
            color: white;
            cursor: pointer;
        }
    }
`;
