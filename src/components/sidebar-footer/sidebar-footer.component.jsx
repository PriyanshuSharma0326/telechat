import React, { useState } from 'react';
import './sidebar-footer.style.scss';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function SidebarFooter() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="sidebar-footer">
            <div className="user">
                <div className="user-image">
                    <img src="https://img.fcbayern.com/image/upload/t_cms-1x1-seo/v1691827799/cms/public/images/fcbayern-com/players/spielerportraits/ganzkoerper/harry-kane.png" alt="" />
                </div>

                <div className="user-name">
                    <h1>Dilshan</h1>
                </div>
            </div>

            <div className="page-mode-icon">
                {!darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </div>
        </div>
    )
}

export default SidebarFooter;
