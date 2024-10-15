import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore" 

const firebaseConfig = {
    apiKey: "AIzaSyCfXbDH_qgWm8hS1XWWdaRIUB6OF6mEN7U",
    authDomain: "hafa-ecomerce.firebaseapp.com",
    projectId: "hafa-ecomerce",
    storageBucket: "hafa-ecomerce.appspot.com",
    messagingSenderId: "194894332482",
    appId: "1:194894332482:web:347d7844344e892c3b23db",
    measurementId: "G-7DPVV6TCVS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app