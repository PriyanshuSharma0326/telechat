import { createContext, useContext, useEffect, useState } from "react";
import { authStateChangeListener, getUsersFromCollections } from '../lib/utils/firebase.utils';
import { StyleContext } from "./style-context";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const { setLoading } = useContext(StyleContext);

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=> {
        const unsubscribe = authStateChangeListener((user) => {
            if(user?.reloadUserInfo.providerUserInfo[0].providerId === 'password') {
                if(user?.photoURL) {
                    setCurrentUser(user);
                }
                else {
                    setLoading(true);
                    setTimeout(() => {
                        setCurrentUser(user);
                        setLoading(false);
                    }, 5000);
                }
            }
            else {
                setCurrentUser(user);
            }
        })

        return unsubscribe;
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            const res = await getUsersFromCollections();
            setUsers(res);
        }

        currentUser && getUsers();
    }, [currentUser]);

    const contextValue = {
        currentUser,
        setCurrentUser,
        users,
    };

    return (
        <UserContext.Provider value={ contextValue }>
            { children }
        </UserContext.Provider>
    )
}
