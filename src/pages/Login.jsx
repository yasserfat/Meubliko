import { useState } from "react";
import Halmet from "../components/Halmet"
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword ,} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

 export default function Login() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });
  const handelSubmit =async (e)=> {
     e.preventDefault();

    setLoader(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password)
        setLoader(false)
        console.log("loges")
        navigate("/DashBoard");
    } catch (error) {
      toast.error(error.message)
      setLoader(false)
    }
  }
  return (
    <Halmet title="Login">
      {loader ? (
        <h1>loading ....</h1>
      ) : (
        <section className="flex justify-center items-center flex-col gap-1">
          <h1 className="text-3xl text-slate-950 font-bold text-center p-12">
            Login
          </h1>

          <div className="bg-slate-800 p-8 w-2/5 ">
            <form onSubmit={(e) => handelSubmit(e)}>
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                value={signUpData.email}
                className="block w-full mb-6 focus:outline-none border rounded px-6 py-2"
                type="email"
                placeholder="email"
              />
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                value={signUpData.password}
                className="block w-full mb-6 focus:outline-none border rounded px-6 py-2"
                type="password"
                placeholder="password"
              />

              <button
                onClick={(e) => handelSubmit(e)}
                className="bg-slate-200 m-auto block text-slate-800 text-lg my-6 font-bold rounded-md px-12 py-2  "
              >
                login
              </button>
            </form>
            <p className="text-center text-gray-600">
              don't have an acount{" "}
              <Link
                className="font-semibold underline text-gray-500"
                to="/signUp"
              >
                Signup
              </Link>{" "}
            </p>
          </div>
        </section>
      )}
    </Halmet>
  );
}
