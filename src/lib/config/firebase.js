import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: 'AIzaSyAbtLxemy8jDuOpq1qkg9mg8gzKGaeHMOc',
    authDomain: 'telechat-ac31a.firebaseapp.com',
    projectId: 'telechat-ac31a',
    storageBucket: 'telechat-ac31a.appspot.com',
    messagingSenderId: '170856230056',
    appId: '1:170856230056:web:4834c51e2fbda76eeaa69d'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

const storage = getStorage();

export {
    auth,
    provider,
    db,
    storage,
};
