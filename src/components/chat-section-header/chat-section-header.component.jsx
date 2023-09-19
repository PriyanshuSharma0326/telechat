import React from 'react';
import './chat-section-header.style.scss';

import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import DuoIcon from '@mui/icons-material/Duo';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ChatSectionHeader() {
    return (
        <div className='chat-section-header'>
            <div className="user">
                <div className="user-image">
                    <img src="https://img.fcbayern.com/image/upload/t_cms-1x1-seo/v1691827799/cms/public/images/fcbayern-com/players/spielerportraits/ganzkoerper/harry-kane.png" alt="" />
                </div>

                <div className="user-name">
                    <h1>Harry Kane</h1>
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
