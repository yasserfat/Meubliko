import { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import user from "../assets/images/user-icon.png";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UseAuth from "../custem-hooks/UserAuth";
import { toast } from "react-toastify";
import {
  clearState,
  arabic,
  english,
  francais,
} from "../redux/slice/CounterSlice";
import logo from "../assets/images/logo.png";
import { MdOutlineLanguage } from "react-icons/md";
import alg from "../assets/images/algeria.png";
import en from "../assets/images/united-kingdom.png";
import fr from "../assets/images/france.png"
import { content } from "../assets/data/content";
export default function Header() {
  const { cartItem, dataFromFireBase } = useSelector((data) => data.cart);
  const { currentUser } = UseAuth();
  const dispatch = useDispatch();
  const [lang, setLAng] = useState(true);
  const { lang: lg } = useSelector((store) => store.cart);
  const handelLang = () => {
    setLAng((lang) => !lang);
  };
  const reference = useRef();
  const [menu, setMenu] = useState(false);
  const togle = useRef(null);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("logedOut successfully ");
        dispatch(clearState());
      })
      .catch((ere) => {
        console.log(ere);
        toast.error(ere.message);
      });
  };
  const OpenMenu = () => {
    setMenu(true);
  };
  const closeMenu = () => {
    setMenu(false);
  };
  const togleM = () => {
    togle.current.classList.toggle("hidden");
  };

  const stickyHeader = () => {
    if (window.scrollY > 80) {
      reference.current.classList.add("sticky_header");
    } else {
      reference.current.classList.remove("sticky_header");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", stickyHeader);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", stickyHeader);
    };
  }, [reference]);

  return (
    <nav
      className="p-4 shadow sticky_header h-fit  z-50 transition-all duration-300 ease-in-out  "
      ref={reference}
    >
      <div
        className={`fixed z-20 top-0 left-0 w-full ${
          menu ? "block" : "hidden"
        } md:hidden  h-full bg-black/40`}
        onClick={closeMenu}
      ></div>

      <div
        className={`fixed md:hidden flex justify-center items-center   top-0 ${
          !menu ? "-right-full" : "right-0 "
        } h-screen bg-slate-100 w-[50%]   z-30 transition-all duration-300 ease-in-out`}
      >
        <div className=" gap-8 container flex justify-center items-center flex-col  text-slate-700 ">
          {content[lg].header.routers.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-extrabold text-xl " : "text-xl font-semibold "
              }
              to={item.path}
              key={item.path}
              onClick={closeMenu}
            >
              {item.element}
            </NavLink>
          ))}
        </div>
        <div
          className={`absolute z-50  left-0 ${
            !menu ? "hidden" : "block"
          } top-0 bg-red-500 px-4 py-2 text-white font-bold `}
        >
          <button onClick={closeMenu}>X</button>
        </div>
      </div>
      <div className={`container m-auto flex justify-between  items-center`}>
        <div className="flex gap-1  items-center">
          <Link
            to="/"
            className="font-extrabold text-xl text-slate-800 font-mono"
          >
            <img src={logo} className="w-12 scale-[1.7]" alt="" />
          </Link>
        </div>
        <div className=" gap-5 hidden md:flex ">
          {content[lg].header.routers.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-extrabold text-md  text-slate-700"
                  : "text-slate-700 text-md font-semibold "
              }
              to={item.path}
              key={item.path}
            >
              {item.element}
            </NavLink>
          ))}
        </div>
        <div className="flex gap-2 justify-center items-center ">
          <div className="relative">
            <AiOutlineHeart className="w-6 h-6" />
            <span className="absolute -top-1 left-1 bg-black text-white w-4 text-center h-4 rounded-full text-xs ">
              0
            </span>
          </div>
          <div className="relative">
            <span className="absolute -top-1 left-1 bg-black text-white w-4 text-center h-4 rounded-full text-xs ">
              {JSON.parse(localStorage.getItem("cartItem"))
                ? JSON.parse(localStorage.getItem("cartItem"))?.length
                : dataFromFireBase?.length || 0}
            </span>

            <AiOutlineShoppingCart className="w-6 h-6" />
          </div>
          <div className="ml-1">
            <MdOutlineLanguage
              onClick={() => {
                handelLang();
              }}
              className="w-6 h-6 cursor-pointer font-bold text-slate-900  "
            />
          </div>
          <div className="ml-1">
            <AiOutlineMenu
              onClick={OpenMenu}
              className="text-xl w-6 h-6 cursor-pointer font-bold text-slate-900 md:hidden "
            />
          </div>
        </div>
      </div>
      <ul
        className={`bg-gray-200 absolute top-24 rounded right-32 p-3 shadow duration-500 overflow-hidden ${
          lang ? "hidden" : "block"
        }  `}
      >
        <li
          className="flex justify-between mb-4"
          onClick={() => {
            dispatch(arabic());
            handelLang();
          }}
        >
          {" "}
          <img src={alg} alt="" className="w-5 mr-5" />{" "}
          <button className="font-bold">Arabic</button>
        </li>
        <li
          className="flex justify-between mb-4"
          onClick={() => {
            dispatch(francais());
            handelLang();
          }}
        >
          {" "}
          <img src={fr} alt="" className="w-5 mr-5" />{" "}
          <button className="font-bold">Francais</button>
        </li>
        <li
          className="flex justify-between"
          onClick={() => {
            dispatch(english());
            handelLang();
          }}
        >
          {" "}
          <img src={en} alt="" className="w-5 mr-5" />{" "}
          <button className="font-bold">English</button>
        </li>
      </ul>
    </nav>
  );
}
