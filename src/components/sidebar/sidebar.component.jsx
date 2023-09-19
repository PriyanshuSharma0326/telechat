import React from 'react';
import './sidebar.style.scss';
import ContactBar from '../contact-bar/contact-bar.component';
import SidebarFooter from '../sidebar-footer/sidebar-footer.component';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <h1>Chats</h1>
            </div>

            <div className="sidebar-search">
                <input type="text" placeholder='Search' />
            </div>

            <div className="contacts-list-container">
                <div className="list-title">contacts</div>

                <div className="contacts-list">
                    <ContactBar />
                </div>

                <SidebarFooter />
            </div>
        </div>
    )
}

export default Sidebar;
