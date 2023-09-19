import React from 'react';
import './contact-bar.style.scss';

function ContactBar() {
    return (
        <div className='contact-bar'>
            <div className="user-info">
                <div className="user-image">
                    <img src="https://img.fcbayern.com/image/upload/t_cms-1x1-seo/v1691827799/cms/public/images/fcbayern-com/players/spielerportraits/ganzkoerper/harry-kane.png" alt="" />
                </div>

                <div className="contact-text">
                    <h1 className="user-name">Ashwin</h1>
                    <p className="last-message">What's up?</p>
                </div>
            </div>

            {/* <div className="pending-message"></div> */}
        </div>
    )
}

export default ContactBar;
