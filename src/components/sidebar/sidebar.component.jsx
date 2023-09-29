import React, { useContext, useEffect, useState } from 'react';
import './sidebar.style.scss';
import ContactBar from '../contact-bar/contact-bar.component';
import SidebarFooter from '../sidebar-footer/sidebar-footer.component';
import { StyleContext } from '../../context/style-context';
import { signOutUser } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import { ChatContext } from '../../context/chat-context';
import LogoutIcon from '@mui/icons-material/Logout';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function Sidebar() {
    const { darkMode } = useContext(StyleContext);
    const { currentUser, setCurrentUser, users } = useContext(UserContext);
    const { userChatsWith, setSelectedChat, setChatMessages } = useContext(ChatContext);

    const [usernameInput, setUsernameInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);

    const handleUsernameInputChange = (e) => {
        setUsernameInput(e.target.value);
    }

    const filterList = async (e) => {
        if (e.code === 'Enter') {
            if(usernameInput) {
                const filteredUsers = users.filter(user => {
                    if (user.uid !== currentUser.uid) {
                        return user.displayName.toLowerCase().includes(usernameInput.toLowerCase());
                    }
                    return false;
                });
    
                setSearchedUsers(filteredUsers);
            }
        }
    }

    useEffect(() => {
        if(!usernameInput.length) {
            setSearchedUsers([]);
        }
    }, [usernameInput]);

    const logUserOut = () => {
        signOutUser();
        setCurrentUser(null);
        setSelectedChat({
            chatID: '',
            userInfo: {},
        });
        setChatMessages([]);
    }

    const [leftValue, setLeftValue] = useState(0);

    const handleSidebar = () => {
        let val;
        if(leftValue < 0) {
            setLeftValue(0)
        }
        else {
            val = window.innerWidth > 426 ? -40 : -70;
            setLeftValue(val);
        }
    }

    return (
        <div 
            className={`sidebar${darkMode ? ' dark-mode' : ''}`} 
            style={{ 
                left: `${leftValue}%`, 
                boxShadow: leftValue === 0 ? '1px 0 36px rgba(0, 0, 0, 0.1)' : 'none', 
                opacity: leftValue !== 0 ? '0.7' : '1' 
            }}
        >
            <div className="sidebar-header">
                <h1>Chats</h1>

                <div className="logout-button">
                    <LogoutIcon onClick={logUserOut} />
                </div>
            </div>

            <div className="sidebar-search">
                <input 
                    type="text" 
                    placeholder='Search' 
                    value={usernameInput} 
                    onKeyDown={filterList} 
                    onChange={handleUsernameInputChange} 
                />
            </div>

            <div className="contacts-list-container">
                <div className="list-title">
                    <h2>{searchedUsers.length !== 0 ? 'search results' : 'contacts'}</h2>
                </div>

                <div className="contacts-list">
                    {searchedUsers.length !== 0 ? 
                    (
                        searchedUsers.map((user) => (
                            <ContactBar 
                                key={user.uid} 
                                user={user} 
                                searched={true} 
                            />
                        ))
                    ) : 
                    (
                        userChatsWith.map((user) => (
                            <ContactBar 
                                key={user[0]} 
                                user={user[1].userInfo} 
                                last={user[1].lastMessage} 
                                searched={false} 
                            />
                        ))
                    )
                    }
                </div>

                <SidebarFooter />
            </div>

            <div className="slide-in-out-button" onClick={handleSidebar}>
                {leftValue < 0 ? <ArrowRightIcon /> :
                <ArrowLeftIcon />}
            </div>
        </div>
    )
}

export default Sidebar;
