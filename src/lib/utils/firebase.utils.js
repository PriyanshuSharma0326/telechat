import { auth, db, provider, storage } from "../config/firebase";

import { 
    Timestamp,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore';

import { 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { v4 as uuidv4 } from 'uuid';

// Method to Create User Doc to collections
const createUserDoc = async (user, name, imageURL) => {
    if(!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userChatsDocRef = doc(db, 'userChats', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { email, uid } = user;

        try {
            await setDoc(userDocRef, {
                uid,
                displayName: name,
                email,
                photoURL: imageURL,
            });
            await setDoc(userChatsDocRef, {});
        }
        catch(err) {
            console.log(err);
        }
    }

    return userDocRef;
}

// Method to Sign User In with Google Popup
const googlePopupSignIn = () => signInWithPopup(auth, provider);

// Method to Sign User In with Email and Password
const signInUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return signInWithEmailAndPassword(auth, email, password);
}

// Method to Sign User Up with Email and Password
const createUserEmailPasswordMethod = async (email, password) => {
    if(!email || !password) {
        return;
    }

    return createUserWithEmailAndPassword(auth, email, password);
}

// Method to Sign User Out
const signOutUser = () => signOut(auth);

// Method to Listen to Auth State Changes
const authStateChangeListener = (callback) => {
    onAuthStateChanged(auth, callback);
}

// Method to Add Image to Storage
const addImageToStorage = async (file, clientName, user) => {
    const { uid } = user;

    const storageRef = ref(storage, uid);

    await uploadBytesResumable(storageRef, file)
    .then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateProfile(user, {
                    displayName: clientName,
                    photoURL: downloadURL,
                });
                await createUserDoc(user, clientName, downloadURL);
            }
            catch (err) {
                console.log(err);
            }
        });
    });
}

// Method to Get Data from collections
const getUsersFromCollections = async () => {
    const collectionRef = collection(db, 'users');

    const querySnapshot = await getDocs(collectionRef);

    const data = querySnapshot.docs.map((doc) => {
        return doc.data();
    });

    return data;
}

const selectUserAndAddToChats = async (currentUser, user) => {
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
    catch(err) {
        alert(err);
    }
}

const addMessageToCollections = async (selectedChat, currentUser, messageText) => {
    const chatMessagesDocRef = doc(db, 'chats', selectedChat.chatID);
    const chatContactsRef = doc(db, "userChats", currentUser?.uid);

    await updateDoc(chatMessagesDocRef, {
        messages: arrayUnion({
            id: uuidv4(),
            messageText,
            senderID: currentUser.uid,
            date: Timestamp.now(),
        })
    })

    await updateDoc(chatContactsRef, {
        [selectedChat.chatID + '.lastMessage']: messageText,
        [selectedChat.chatID + '.date']: serverTimestamp(),
    })
}

export {
    googlePopupSignIn,
    createUserDoc,
    createUserEmailPasswordMethod,
    signInUserEmailPasswordMethod,
    signOutUser,
    authStateChangeListener,

    addImageToStorage,
    getUsersFromCollections,
    selectUserAndAddToChats,
    addMessageToCollections,
};
