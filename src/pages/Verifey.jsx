import { useNavigate } from "react-router-dom";
import UseAuth from "../custem-hooks/UserAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Verifey() {
  const { currentUser } = UseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser?.emailVerified) {
      navigate("/Shop");
      toast.success('Your account has been verifeid ');
    }
  }, [currentUser]);
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
        <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          <h3 className="text-2xl">Thanks for signing up for Websitename!</h3>
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>

          <p>
            We're happy you're here. we have just sent you a confirmation email{" "}
          </p>
          <div className="mt-4">
            <p>check your email</p>
            <button onClick={()=> location.reload()} className="px-6 py-2 font-bold rounded-md bg-black  mt-4 text-slate-100 ">check if verified</button>
          </div>
        </div>
      </div>
    </div>
  );
}
