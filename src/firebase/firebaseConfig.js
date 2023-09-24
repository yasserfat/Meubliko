import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore" 

const firebaseConfig = {
    apiKey: "AIzaSyBWyrbr-10yZ5uDICPJvYBnAHdtuiHRL18",
    authDomain: "e-commrece-60f08.firebaseapp.com",
    projectId: "e-commrece-60f08",
    storageBucket: "e-commrece-60f08.appspot.com",
    messagingSenderId: "298980683827",
    appId: "1:298980683827:web:fb0cd6b63ec0718f1eb346"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app