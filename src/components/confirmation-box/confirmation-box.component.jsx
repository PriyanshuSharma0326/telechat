import React, { useContext, useEffect, useRef } from 'react';
import './confirmation-box.style.scss';
import { ChatContext } from '../../context/chat-context';
import { deleteMessage } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import { StyleContext } from '../../context/style-context';

function useOutsideAlerter(ref) {
    const {
        setSelectedMessage,
        setShowDeleteConfirmBox
    } = useContext(ChatContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowDeleteConfirmBox(false);
                setSelectedMessage({});
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function ConfirmationBox() {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const {
        selectedChat,
        selectedMessage,
        setSelectedMessage,
        setShowDeleteConfirmBox
    } = useContext(ChatContext);

    const { currentUser } = useContext(UserContext);

    const hideConfirmationBox = () => {
        setShowDeleteConfirmBox(false);
        setSelectedMessage({});
    }

    const handleDeleteMessage = async () => {
        await deleteMessage(selectedChat, currentUser, selectedMessage);
        hideConfirmationBox();
    }

    const { darkMode } = useContext(StyleContext);

    return (
        <div className={`confirmation-box-container${darkMode ? ' dark-mode' : ''}`} ref={wrapperRef}>
            <div className="buttons-container">
                <button onClick={handleDeleteMessage}>Delete</button>

                <button onClick={hideConfirmationBox}>Cancel</button>
            </div>
        </div>
    )
}

export default ConfirmationBox;
