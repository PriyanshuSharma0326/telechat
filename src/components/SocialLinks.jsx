import React from 'react'
import styled from 'styled-components';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function SocialLinks() {
    return (
        <SocialLinksContainer>
            <a href='https://github.com/PriyanshuSharma0326/' target='_blank' rel='noreferrer noopener'>
                <GitHubIcon />
            </a>

            <a href='https://linkedin.com/in/priyanshusharma0326/' target='_blank' rel='noreferrer noopener'>
                <LinkedInIcon />
            </a>

            <a href='https://twitter.com/xtechilad/' target='_blank' rel='noreferrer noopener'>
                <TwitterIcon />
            </a>

            <a href='https://instagram.com/xtechilad.jpg/' target='_blank' rel='noreferrer noopener'>
                <InstagramIcon />
            </a>

            <a href='https://pinterest.com/xtechilad/' target='_blank' rel='noreferrer noopener'>
                <PinterestIcon />
            </a>
        </SocialLinksContainer>
    );
}

const SocialLinksContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 40px;

    > a {
        display: flex;
        margin: 0 auto;

        > .MuiSvgIcon-root {
            color: white;

            :hover {
                opacity: 0.8;
            }
        }
    }
`;
