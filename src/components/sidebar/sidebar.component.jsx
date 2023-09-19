import React, { useContext } from 'react';
import './sidebar.style.scss';
import ContactBar from '../contact-bar/contact-bar.component';
import SidebarFooter from '../sidebar-footer/sidebar-footer.component';
import { StyleContext } from '../../context/style-context';

function Sidebar() {
    const { darkMode } = useContext(StyleContext);

    return (
        <div className={`sidebar ${darkMode && 'dark-mode'}`}>
            <div className="sidebar-header">
                <h1>Chats</h1>
            </div>

            <div className="sidebar-search">
                <input type="text" placeholder='Search' />
            </div>

            <div className="contacts-list-container">
                <div className="list-title">
                    <h2>contacts</h2>
                </div>

                <div className="contacts-list">
                    <ContactBar />
                </div>

                <SidebarFooter />
            </div>
        </div>
    )
}

export default Sidebar;
