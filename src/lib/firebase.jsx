// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCsGLD53QVotQ2aa6CjV0PvPot4o0gBIKc",
    authDomain: "socialmedia-uz.firebaseapp.com",
    projectId: "socialmedia-uz",
    storageBucket: "socialmedia-uz.appspot.com",
    messagingSenderId: "871782092807",
    appId: "1:871782092807:web:c88f630e5b5924caae9aa2",
    measurementId: "G-X67YSXFG7X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)

export const storage = getStorage(app);