import { auth, db, provider, storage } from "../config/firebase";

import { 
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
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

export {
    googlePopupSignIn,
    createUserDoc,
    createUserEmailPasswordMethod,
    signInUserEmailPasswordMethod,
    signOutUser,
    authStateChangeListener,

    addImageToStorage,
    getUsersFromCollections,
};
