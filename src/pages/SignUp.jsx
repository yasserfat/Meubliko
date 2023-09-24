import Halmet from "../components/Halmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword,updateProfile,sendEmailVerification } from "firebase/auth";
import { uploadBytesResumable,getDownloadURL, ref } from "firebase/storage";
import { auth,storage,db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UseAuth from "../custem-hooks/UserAuth";
export default function SignUp() {
  const { currentUser } = UseAuth();
  const navigate = useNavigate()
  const [signUpData, setSignUpData] = useState({
    email: "",
    userName: "",
    password: "",
    file: null,
  });
  const [loader, setLoader] = useState(false);
  const signup = async(e) => {
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
      const storageref = ref(storage,`images/${Date.now() + signUpData.userName}`)
      const uploadTask = uploadBytesResumable(storageref,signUpData.file)
      uploadTask.on((error)=> {
        toast.error(error.message)
      },()=> {
        getDownloadURL(uploadTask.snapshot.ref).then(async(DownloadURL)=> {
          await updateProfile(user, {
            displayName:signUpData.userName,
            photoURL:DownloadURL
          })
          await setDoc(doc(db,'users',user.uid),{
            uid:user.uid,
            displayName:signUpData.userName,
            email:signUpData.email,
            photoURL:DownloadURL,
            cartItems:[]
          })
        })
      })
    setLoader(false);
    toast.success("signin is done succesfull")
    navigate("/Verifey");
   
      console.log(userCredential);
    } catch (error) {
    setLoader(false);

      toast.error('something went wrong')
      console.log(error)
    }
    
  };
  return (
    <Halmet title="SignUp">
      {loader ? (
        <h1>loading ...</h1>
      ) : (
        <section className="flex justify-center items-center flex-col gap-1 container m-auto">
          <h1 className="text-3xl text-slate-950 font-bold text-center p-12">
            SignUp
          </h1>

          <div className="bg-slate-800 p-8 w-full sm:w-3/5 md:2/5 rounded-lg">
            <form onSubmit={signup}>
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, userName: e.target.value })
                }
                value={signUpData.userName}
                className="block w-full mb-6 focus:outline-none border rounded px-6 py-2"
                type="text"
                placeholder="username"
              />
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
              <input
                onChange={(e) =>
                  setSignUpData({ ...signUpData, file: e.target.files[0] })
                }
                className="block w-full mb-6 focus:outline-none border rounded px-6 py-2"
                type="file"
              />

              <button className="bg-slate-200 m-auto block text-slate-800 text-lg my-6 font-bold rounded-md px-12 py-2  ">
                SignUp
              </button>
            </form>
            <p className="text-center text-gray-600">
              already have an acount{" "}
              <Link
                className="font-semibold underline text-gray-500"
                to="/Login"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </section>
      )}
    </Halmet>
  );
}
