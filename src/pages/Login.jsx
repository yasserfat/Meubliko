import { useState } from "react";
import Halmet from "../components/Halmet";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import shopImg from "../assets/shop-img.png";
import loadingGif from "../assets/images/shopping-loader.gif";

export default function Login() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      setLoader(false);
      console.log("loges");
      navigate("/DashBoard");
    } catch (error) {
      toast.error(error.message);
      setLoader(false);
    }
  };
  return (
    <Halmet title="Login">
      {loader ? (
        <div className="flex items-start justify-center">
          <img src={loadingGif} alt="loading-gif" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <img src={shopImg} alt="shop-img" />
          </div>
          <div className="flex flex-col justify-center mx-auto p-[30px]">
            <h1 className="text-3xl font-bold">Connectez-vous à Exclusif</h1>
            <form action="" className="flex flex-col my-[30px] gap-[30px]">
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                value={signUpData.email}
                className="outline-none border-b border-gray-400 py-[3px]"
                type="text"
                placeholder="E-mail"
              />
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                value={signUpData.password}
                className="outline-none border-b border-gray-400 py-[3px]"
                type="password"
                placeholder="Password"
              />
            </form>
            <div className="flex justify-between items-center gap-[30px]">
              <button
                onClick={(e) => handelSubmit(e)}
                className="bg-[#DB4444] px-[15px] py-[7px] text-white rounded-md"
              >
                Se connecter
              </button>
              <p className="text-[#DB4444] font-semibold">
                Je n'ai pas de compte?{" "}
                <Link
                  className="font-semibold underline text-gray-800"
                  to="/signUp"
                >
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </Halmet>
  );
}
