import { useEffect, useState } from "react"
import { auth } from "../firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"

export default function UseAuth() {
    const [currentUser,setCurrentUser] = useState({})
    
    
    useEffect(() => {
      const unsubscribe= onAuthStateChanged(auth, (user) => {
       
        if (user?.emailVerified) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      });
      return () => {
        unsubscribe(); 
      };
    }, []);
  return {currentUser}
}

