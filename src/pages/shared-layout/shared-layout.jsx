import React from 'react';
import './shared-layout.style.scss';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar.component';

function SharedLayout() {
    return (
        <div className='shared-layout'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default SharedLayout;
