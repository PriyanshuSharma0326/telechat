import React, { useContext } from 'react';
import './chat-section-header.style.scss';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import DuoIcon from '@mui/icons-material/Duo';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StyleContext } from '../../context/style-context';
import { ChatContext } from '../../context/chat-context';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ChatSectionHeader() {
    const { darkMode } = useContext(StyleContext);
    const { selectedChat } = useContext(ChatContext);

    return (
        <div className={`chat-section-header ${darkMode && 'dark-mode'}`}>
            <div className="user">
                {selectedChat?.userInfo.photoURL ? 
                    <div className="user-image">
                        <img src={selectedChat?.userInfo.photoURL} alt={selectedChat?.userInfo.displayName} />
                    </div> :
                    <div className="account-icon">
                        <AccountCircleIcon />
                    </div>
                }

                <div className="user-name">
                    <h1>{selectedChat?.userInfo.displayName}</h1>
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
