import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/config/firebase";

export const ChatContext = createContext();

export const ChatContextProvider =({ children }) => {
    const { currentUser } = useContext(UserContext);

    const [userChatsWith, setUserChatsWith] = useState();

    const [selectedChat, setSelectedChat] = useState({
        chatID: '',
        user: {},
    });

    useEffect(() => {
        const getChats = async () => {
            const chatRef = doc(db, "userChats", currentUser?.uid);

            const unsub = onSnapshot(chatRef, (doc) => {
                setUserChatsWith(Object.entries(doc.data()));
            });

            return unsub;
        }

        currentUser?.uid && getChats();
        setUserChatsWith([]);
    }, [currentUser?.uid]);

    const contextValue = { userChatsWith };

    return (
        <ChatContext.Provider value={ contextValue }>
            { children }
        </ChatContext.Provider>
    )
}
