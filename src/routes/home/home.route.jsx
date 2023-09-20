import React from 'react';
import './home.style.scss';
import Sidebar from '../../components/sidebar/sidebar.component';
import Main from '../../pages/app-main/app-main';

function SharedLayout() {
    return (
        <div className='home'>
            <Sidebar />

            <Main />
        </div>
    )
}

export default SharedLayout;
