import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/config/firebase";

export const ChatContext = createContext();

export const ChatContextProvider =({ children }) => {
    const { currentUser } = useContext(UserContext);

    const [userChatsWith, setUserChatsWith] = useState([]);

    const [selectedChat, setSelectedChat] = useState({
        chatID: '',
        userInfo: {},
    });

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const getChatContacts = async () => {
            const chatContactsRef = doc(db, "userChats", currentUser?.uid);

            const unsub = onSnapshot(chatContactsRef, (doc) => {
                if(doc) {
                    setUserChatsWith(Object.entries(doc?.data()).sort((a, b) => b[1].lastMessage - a[1].lastMessage));
                }
            });

            return unsub;
        }

        currentUser?.uid && getChatContacts();
        setUserChatsWith([]);
    }, [currentUser?.uid]);

    useEffect(() => {
        const getChatMessages = async () => {
            const chatMessagesRef = doc(db, "chats", selectedChat.chatID);

            const unsub = onSnapshot(chatMessagesRef, (doc) => {
                setChatMessages(doc.data().messages.sort((a, b) => b.date - a.date));
            });

            return unsub;
        }

        selectedChat.chatID && getChatMessages();
    }, [selectedChat.chatID]);

    const contextValue = { 
        userChatsWith,
        selectedChat,
        setSelectedChat,
        chatMessages,
        setChatMessages,
    };

    return (
        <ChatContext.Provider value={ contextValue }>
            { children }
        </ChatContext.Provider>
    )
}
