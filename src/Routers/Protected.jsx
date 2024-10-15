import UseAuth from "../custem-hooks/UserAuth"
import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
export default function Protected() {
    const { currentUser } = UseAuth();
    console.log(currentUser,"currentUser")
    
  return currentUser ? <Outlet/> : <Navigate to="/Login" />;
}
