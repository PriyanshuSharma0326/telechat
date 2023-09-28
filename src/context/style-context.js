import React, { createContext, useState } from "react";

export const StyleContext = createContext();

export const StyleContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const contextValue = {
        darkMode,
        setDarkMode,
        loading,
        setLoading,
    };

    return <StyleContext.Provider value={contextValue}>
        { children }
    </StyleContext.Provider>
}
