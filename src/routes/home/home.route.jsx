import React from 'react';
import './home.style.scss';
import Sidebar from '../../components/sidebar/sidebar.component';
import Main from '../../pages/app-main/app-main';
import { SearchContextProvider } from '../../context/search-context';

function SharedLayout() {
    return (
        <div className='home'>
            <SearchContextProvider>
                <Sidebar />
            </SearchContextProvider>

            <Main />
        </div>
    )
}

export default SharedLayout;
