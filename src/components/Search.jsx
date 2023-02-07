import React, { useState } from 'react'
import styled from 'styled-components';

import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../lib/config/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function Search() {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const currentUser = useSelector(selectUser);

    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'), 
            where('displayName', '==', username)
        );
        
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        }
        catch (error) {
            setError(true);
        }
    }

    const handleKey = (event) => {
        (event.code === 'Enter') && handleSearch();
    }

    const handleSelect = async () => {
        const combinedID = ((currentUser.uid > user.uid) ? (currentUser.uid + user.uid) : (user.uid + currentUser.uid));

        try {
            const response = await getDoc(doc(db, 'chats', combinedID));

            if(!response.exists()) {
                await setDoc(doc(db, 'chats', combinedID), { messages: [] });

                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedID+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
                });
    
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedID+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
                });
            }
        }
        catch (erorr) {
            setError(true);
        }

        setUser(null);
        setUsername('');
    }

    return (
        <SearchContainer>
            <SearchForm>
                <input 
                    value={username}
                    placeholder='Find a user' 
                    onKeyDown={handleKey}
                    onChange={(event) => setUsername(event.target.value)} 
                />
            </SearchForm>

            {error && <span>User not found!</span>}

            {user &&
                <UserChat onClick={handleSelect}>
                    <img src={user?.photoURl} alt='user1' />
                    <UserChatInfo>
                        <span>{user?.displayName}</span>
                    </UserChatInfo>
                </UserChat>
            }
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
    border-bottom: 1px solid lightgray;
`;

const SearchForm = styled.div`
    padding: 10px;

    > input {
        background-color: transparent;
        border: none;
        outline: none;
        color: #D1D7DB;

        ::placeholder {
            color: #8696A0;
        }
    }
`;

const UserChat = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    > img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }

    :hover {
        background-color: #2A3942;
    }
`;

const UserChatInfo = styled.div`
    color: #D1D7DB;
    > span {
        font-weight: 500;
    }
`;
