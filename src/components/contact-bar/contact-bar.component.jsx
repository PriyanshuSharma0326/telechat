import React, { useContext } from 'react';
import './contact-bar.style.scss';
import { StyleContext } from '../../context/style-context';
import { db } from '../../lib/config/firebase';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../../context/user-context';

function ContactBar({ user }) {
    const { darkMode } = useContext(StyleContext);
    const { currentUser } = useContext(UserContext);

    // const user = null;

    const handleSelect = async () => {
        const combinedID = currentUser.uid > user.uid ? 
        currentUser.uid + user.uid : 
        user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, 'chats', combinedID));

            if(!res.exists()) {
                await setDoc(doc(db, 'chats', combinedID), {
                    messages: []
                });

                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedID + '.userInfo'] : {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedID + '.date'] : serverTimestamp()
                })

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedID + '.userInfo'] : {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedID + '.date'] : serverTimestamp()
                })
            }
        }
        catch(err) {}
    }

    return (
        <div className={`contact-bar ${darkMode && 'dark-mode'}`} onClick={handleSelect}>
            <div className="user-info">
                <div className="user-image">
                    <img src={user.photoURL} alt={user.displayName} loading='lazy' />
                </div>

                <div className="contact-text">
                    <h1 className="user-name">{user.displayName}</h1>
                    <p className="last-message">What's up?</p>
                </div>
            </div>

            {/* <div className="pending-message"></div> */}
        </div>
    )
}

export default ContactBar;
