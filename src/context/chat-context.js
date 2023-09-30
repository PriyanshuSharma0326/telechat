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
        const getChatContacts = () => {
            const chatContactsRef = doc(db, "userChats", currentUser?.uid);

            const unsub = onSnapshot(chatContactsRef, (doc) => {
                if(doc) {
                    setUserChatsWith(Object.entries(doc?.data()).sort((a, b) => b[1].date - a[1].date));
                }
            });

            return unsub;
        }

        currentUser?.uid && getChatContacts();
        setUserChatsWith([]);
    }, [currentUser?.uid]);

    useEffect(() => {
        // Define the onSnapshot listener and unsub function outside of the condition.
        let unsub = null;
    
        const getChatMessages = () => {
            if (!selectedChat.chatID) {
                return;
            }
    
            const chatMessagesRef = doc(db, "chats", selectedChat.chatID);
    
            // Register the listener
            unsub = onSnapshot(chatMessagesRef, (doc) => {
                setChatMessages(doc.data().messages.sort((a, b) => b.date - a.date));
            });
        };
    
        getChatMessages(); // Call the function immediately.
    
        // Deregister the listener when the component unmounts.
        return () => {
            if (unsub) {
                unsub(); // Call unsub if it's defined.
            }
        };
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
