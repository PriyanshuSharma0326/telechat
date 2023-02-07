import React from 'react'
import styled from 'styled-components';

import AttachmentIcon from '@mui/icons-material/Attachment';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

export default function ChatInput() {
    return (
        <ChatInputContainer>
            <input type='text' placeholder='Type something here...' />

            <Send>
                <AttachmentIcon />

                <input type='file' id='fileUpload' />

                <label htmlFor='fileUpload'>
                    <ImageIcon />
                </label>

                <button>
                    <SendIcon />
                </button>
            </Send>
        </ChatInputContainer>
    );
}

const ChatInputContainer = styled.div`
    height: 50px;
    background-color: #2A3942;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > input {
        background-color: #2A3942;
        width: 100%;
        border: none;
        outline: none;
        color: #D1D7DB;
        font-size: 16px;

        ::placeholder {
            color: #8696A0;
        }
    }
`;

const Send = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    .MuiSvgIcon-root {
        font-size: 22px;
        cursor: pointer;
        color: #8696A0;
    }

    > button {
        background-color: #128C7E;
        border: none;
        outline: none;
        border-radius: 50%;
        display: flex;
        height: 36px;
        width: 36px;
        cursor: pointer;

        .MuiSvgIcon-root {
            color: white;
            margin: auto;
            padding-left: 2px;
            padding-top: 1px;
        }
    }

    #fileUpload {
        display: none;
    }
`;
