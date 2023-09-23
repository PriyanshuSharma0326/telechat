import React, { useContext, useEffect, useState } from 'react';
import './sidebar.style.scss';
import ContactBar from '../contact-bar/contact-bar.component';
import SidebarFooter from '../sidebar-footer/sidebar-footer.component';
import { StyleContext } from '../../context/style-context';
import { signOutUser } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import { ChatContext } from '../../context/chat-context';

function Sidebar() {
    const { darkMode } = useContext(StyleContext);
    const { currentUser, setCurrentUser, users } = useContext(UserContext);
    const { userChatsWith } = useContext(ChatContext);

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
        if(!usernameInput) {
            setSearchedUsers([]);
        }
    }, [usernameInput]);

    const logUserOut = () => {
        signOutUser();
        setCurrentUser(null);
    }

    return (
        <div className={`sidebar${darkMode ? ' dark-mode' : ''}`}>
            <div className="sidebar-header">
                <h1>Chats</h1>

                <button onClick={logUserOut}>Logout</button>
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
                            <ContactBar key={user.uid} user={user} />
                        ))
                    ) : 
                    (
                        userChatsWith.map((user) => (
                            <ContactBar key={user[0]} user={user[1].userInfo} />
                        ))
                    )
                    }
                </div>

                <SidebarFooter />
            </div>
        </div>
    )
}

export default Sidebar;
