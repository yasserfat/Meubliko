import Halmet from "../components/Halmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { auth, storage, db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UseAuth from "../custem-hooks/UserAuth";

import shopImg from "../assets/shop-img.png";
import loadingGif from "../assets/images/shopping-loader.gif";

export default function SignUp() {
  const { currentUser } = UseAuth();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    userName: "",
    password: "",
    file: null,
  });
  const [loader, setLoader] = useState(false);
  const signup = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      const storageref = ref(
        storage,
        `images/${Date.now() + signUpData.userName}`
      );
      const uploadTask = uploadBytesResumable(storageref, signUpData.file);
      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (DownloadURL) => {
            await updateProfile(user, {
              displayName: signUpData.userName,
              photoURL: DownloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: signUpData.userName,
              email: signUpData.email,
              photoURL: DownloadURL,
              cartItems: [],
            });
          });
        }
      );
      setLoader(false);
      toast.success("signin is done succesfull");
      navigate("/Verifey");

      console.log(userCredential);
    } catch (error) {
      setLoader(false);

      toast.error("something went wrong");
      console.log(error);
    }
  };
  return (
    <Halmet title="SignUp">
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
            <h1 className="text-3xl font-bold">Créer un compte</h1>
            <form action="" className="flex flex-col my-[30px] gap-[30px]">
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, userName: e.target.value })
                }
                value={signUpData.userName}
                className="outline-none border-b border-gray-400 py-[3px]"
                type="text"
                placeholder="Username"
              />
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
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, file: e.target.files[0] })
                }
                className="outline-none border-b border-gray-400 py-[3px]"
                type="file"
              />
            </form>
            <div className="flex justify-between items-center gap-[30px]">
              <button
                onClick={signup}
                className="bg-[#DB4444] px-[15px] py-[7px] text-white rounded-md"
              >
                Créer un compte
              </button>
              <p className="text-[#DB4444] font-semibold">
                vous avez déjà un compte?{" "}
                <Link
                  className="font-semibold underline text-gray-800"
                  to="/Login"
                >
                  Ce connecter
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </Halmet>
  );
}
