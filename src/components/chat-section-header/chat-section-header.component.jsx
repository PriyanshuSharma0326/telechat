import React, { useContext } from 'react';
import './chat-section-header.style.scss';

import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import DuoIcon from '@mui/icons-material/Duo';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StyleContext } from '../../context/style-context';
import { UserContext } from '../../context/user-context';

function ChatSectionHeader() {
    const { darkMode } = useContext(StyleContext);
    const { currentUser } = useContext(UserContext);

    return (
        <div className={`chat-section-header ${darkMode && 'dark-mode'}`}>
            <div className="user">
                <div className="user-image">
                    <img src={currentUser?.photoURL} alt={currentUser?.displayName} />
                </div>

                <div className="user-name">
                    <h1>{currentUser?.displayName}</h1>
                </div>
            </div>

            <div className="header-icons">
                <div className="icon">
                    <SearchIcon />
                </div>
                <div className="icon">
                    <CallIcon />
                </div>
                <div className="icon">
                    <DuoIcon />
                </div>
                <div className="icon">
                    <InfoIcon />
                </div>
                <div className="icon">
                    <MoreVertIcon />
                </div>
            </div>
        </div>
    )
}

export default ChatSectionHeader;
