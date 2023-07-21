import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6-VLKIXZHk6EAGTXPNMbuPJFEGepl_CQ",
    authDomain: "passwordmanager-94c19.firebaseapp.com",
    projectId: "passwordmanager-94c19",
    storageBucket: "passwordmanager-94c19.appspot.com",
    messagingSenderId: "642337913546",
    appId: "1:642337913546:web:53d1368ef599d096ced233",
    measurementId: "G-VWGV76J85J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);