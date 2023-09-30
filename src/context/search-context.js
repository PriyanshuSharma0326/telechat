import React, { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        if(!usernameInput.length) {
            setSearchedUsers([]);
        }
    }, [usernameInput]);

    const contextValue = {
        usernameInput,
        setUsernameInput,
        searchedUsers,
        setSearchedUsers,
    };

    return (
        <SearchContext.Provider value={ contextValue }>
            { children }
        </SearchContext.Provider>
    )
}
