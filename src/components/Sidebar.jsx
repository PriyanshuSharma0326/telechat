import React from 'react'
import styled from 'styled-components';
import SidebarChats from './SidebarChats';
import Navbar from './Navbar';
import Search from './Search';

export default function Sidebar() {
    return (
        <SidebarContainer>
            <Navbar />

            <Search />

            <SidebarChats />
        </SidebarContainer>
    );
}

const SidebarContainer = styled.div`
    flex: 1;
    background-color: #111B21;
`;
