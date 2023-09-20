import React, { useContext } from 'react';
import './sidebar-footer.style.scss';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { StyleContext } from '../../context/style-context';
import { UserContext } from '../../context/user-context';

function SidebarFooter() {
    const {darkMode, setDarkMode} = useContext(StyleContext);

    const { currentUser } = useContext(UserContext);

    const changeMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className="sidebar-footer">
            <div className="user">
                <div className="user-image">
                    <img src={currentUser?.photoURL} alt={currentUser?.displayName} />
                </div>

                <div className="user-name">
                    <h1>{currentUser?.displayName}</h1>
                </div>
            </div>

            <div className="page-mode-icon">
                {!darkMode ? 
                    <DarkModeIcon onClick={changeMode} /> : 
                    <LightModeIcon onClick={changeMode} />
                }
            </div>
        </div>
    )
}

export default SidebarFooter;
