import React, { useContext } from 'react';
import './contact-bar.style.scss';
import { StyleContext } from '../../context/style-context';
import { UserContext } from '../../context/user-context';
import { ChatContext } from '../../context/chat-context';
import { selectUserAndAddToChats } from '../../lib/utils/firebase.utils';

function ContactBar({ user, searched, last }) {
    const { darkMode } = useContext(StyleContext);
    const { currentUser } = useContext(UserContext);
    const { selectedChat, setSelectedChat } = useContext(ChatContext);

    // Selection of Searched Results
    const handleSelectSearchedUser = async () => {
        await selectUserAndAddToChats(currentUser, user);
    }

    // Selection of User Contacts
    const handleSelectUserContact = () => {
        const combinedID = currentUser.uid > user.uid ? 
        currentUser.uid + user.uid : 
        user.uid + currentUser.uid;

        setSelectedChat({ chatID: combinedID, userInfo: user })
    }

    return (
        <div 
            className={`contact-bar${darkMode ? ' dark-mode' : ''}${selectedChat.userInfo.uid === user.uid ? ' selected-contact' : ''}`} 
            onClick={searched ? handleSelectSearchedUser : handleSelectUserContact}
        >
            <div className="user-info">
                <div className="user-image">
                    <img src={user.photoURL} alt={user.displayName} loading='lazy' />
                </div>

                <div className="contact-text">
                    <h1 className="user-name">{user.displayName}</h1>
                    <p className="last-message">{last}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactBar;
