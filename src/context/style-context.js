import React, { createContext, useState } from "react";

export const StyleContext = createContext();

export const StyleContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const contextValue = { darkMode, setDarkMode };

    return <StyleContext.Provider value={contextValue}>
        { children }
    </StyleContext.Provider>
}
