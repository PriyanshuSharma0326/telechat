import React, { useContext } from 'react';
import './contact-bar.style.scss';
import { StyleContext } from '../../context/style-context';
import { UserContext } from '../../context/user-context';
import { ChatContext } from '../../context/chat-context';
import { selectUserAndAddToChats } from '../../lib/utils/firebase.utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SearchContext } from '../../context/search-context';

function ContactBar({ user, searched, last }) {
    const { darkMode } = useContext(StyleContext);
    const { currentUser } = useContext(UserContext);
    const { selectedChat, setSelectedChat } = useContext(ChatContext);
    const { setUsernameInput } = useContext(SearchContext);

    const combinedID = currentUser.uid > user.uid ? 
        currentUser.uid + user.uid : 
        user.uid + currentUser.uid;

    // Selection of Searched Results
    const handleSelectSearchedUser = async () => {
        await selectUserAndAddToChats(currentUser, user);
        setSelectedChat({ chatID: combinedID, userInfo: user });

        setTimeout(() => {
            setUsernameInput('');
        }, 1000);
    }

    // Selection of User Contacts
    const handleSelectUserContact = () => {
        setSelectedChat({ chatID: combinedID, userInfo: user });
    }

    return (
        <div 
            className={`contact-bar${darkMode ? ' dark-mode' : ''}${selectedChat.userInfo?.uid === user.uid ? ' selected-contact' : ''}`} 
            onClick={searched ? handleSelectSearchedUser : handleSelectUserContact}
        >
            <div className="user-info">
                {user.photoURL ? 
                    <div className="user-image">
                        <img src={user.photoURL} alt={user.displayName} />
                    </div> :
                    <div className="account-icon">
                        <AccountCircleIcon />
                    </div>
                }

                <div className="contact-text">
                    <h1 className="user-name">{user.displayName}</h1>
                    {last && <p className='last-message'>You: <span className={`${last === 'Deleted a message' ? ' deleted' : ''}`}>{last}</span></p>}
                </div>
            </div>
        </div>
    )
}

export default ContactBar;
