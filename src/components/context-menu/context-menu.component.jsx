import React, { useContext, useEffect, useRef } from 'react';
import './context-menu.style.scss';
import { ChatContext } from '../../context/chat-context';
import { StyleContext } from '../../context/style-context';

function useOutsideAlerter(ref) {
    const { setShowContextMenu, setSelectedMessage, setEditing } = useContext(ChatContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowContextMenu(false);
                setSelectedMessage({});
                setEditing(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function ContextMenu() {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const {
        setShowContextMenu,
        setSelectedMessage,
        setShowDeleteConfirmBox,
        setEditing
    } = useContext(ChatContext);

    const hideContextMenu = () => {
        setShowContextMenu(false);
        setSelectedMessage({});
        setEditing(false);
    }

    const handleDeleteConfirmation = () => {
        setShowContextMenu(false);
        setShowDeleteConfirmBox(true);
    }

    const handleEditMessageResponse = () => {
        setEditing(true);
        setShowContextMenu(false);
    }

    const { darkMode } = useContext(StyleContext);

    return (
        <div className={`context-menu-container${darkMode ? ' dark-mode' : ''}`} ref={wrapperRef}>
            <div className="buttons-container">
                <button onClick={handleDeleteConfirmation}>Delete message</button>

                <button onClick={handleEditMessageResponse}>Edit message</button>

                <button onClick={hideContextMenu}>Cancel</button>
            </div>
        </div>
    )
}

export default ContextMenu;
