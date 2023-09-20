import { auth, db, provider, storage } from "../config/firebase";

import { 
    doc,
    getDoc,
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
const createUserDoc = async (user) => {
    if(!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email, photoURL, uid } = user;

        try {
            await setDoc(userDocRef, {
                uid,
                displayName,
                email,
                photoURL,
            });
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

    // const url = 
    await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
                await updateProfile(user, {
                    displayName: clientName,
                    photoURL: downloadURL,
                });

                await createUserDoc(user);

                await setDoc(doc(db, "userChats", uid), {});
            }
            catch (err) {
                console.log(err);
            }
        });
    });
}

// Method to Get Shop Data from collections
// const getShopDataFromCollections = async () => {
//     const collectionRef = collection(db, 'categories');

//     const q = query(collectionRef);

//     const querySnapshot = await getDocs(q);

//     const shopData = querySnapshot.docs.map(docSnapshot => {
//         return docSnapshot.data();
//     });

//     return shopData;
// }

export {
    googlePopupSignIn,
    createUserDoc,
    createUserEmailPasswordMethod,
    signInUserEmailPasswordMethod,
    signOutUser,
    authStateChangeListener,

    addImageToStorage,

    // addCollectionAndDocuments,
    // getShopDataFromCollections,
};
