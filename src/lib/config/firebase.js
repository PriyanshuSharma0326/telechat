import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage }from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDkc3GC1X7-QmDftl56ogsYgRfJeOz9_zA",
    authDomain: "telechat-b0d0c.firebaseapp.com",
    projectId: "telechat-b0d0c",
    storageBucket: "telechat-b0d0c.appspot.com",
    messagingSenderId: "748298537128",
    appId: "1:748298537128:web:7534f5c457bd5737025a9d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const storage = getStorage();

const db = getFirestore(app);

export { auth, db, storage };