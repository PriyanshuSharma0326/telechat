import React, { useContext } from 'react';
import './message.style.scss';
import { StyleContext } from '../../context/style-context';

function Message({ messageText }) {
    const { darkMode } = useContext(StyleContext);

    return (
        <div className={`message-container${darkMode ? ' dark-mode' : ''}`}>
            <div className="message-text">
                <p>{messageText}</p>
            </div>

            <div className="user-image">
                    <img src="https://img.fcbayern.com/image/upload/t_cms-1x1-seo/v1691827799/cms/public/images/fcbayern-com/players/spielerportraits/ganzkoerper/harry-kane.png" alt="" />
                </div>
        </div>
    )
}

export default Message;
