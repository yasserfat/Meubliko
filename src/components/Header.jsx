import { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import user from "../assets/images/user-icon.png";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRef, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import UseAuth from "../custem-hooks/UserAuth";
import { toast } from "react-toastify";
import { clearState } from "../redux/slice/CounterSlice";

export default function Header() {
  const { cartItem } = useSelector((data) => data.cart);
  const { currentUser } = UseAuth();
  const dispatch = useDispatch()

  const reffernce = useRef(null);
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
  const stickyHearder = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        reffernce.current.classList.add("sticky_header");
      } else {
        reffernce.current.classList.remove("sticky_header");
      }
    });
  };
  useEffect(() => {
    stickyHearder();
    return () => window.removeEventListener("scroll", stickyHearder);
  });

  const routers = [
    {
      path: "/",
      element: "Home",
    },
    {
      path: "/Shop",
      element: "Shop",
    },
    {
      path: "/Cart",
      element: "Cart",
    },
  ];
  return (
    <nav
      className="p-4 shadow h-fit relative  z-50 transition-all duration-300 ease-in-out  "
      ref={reffernce}
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
        <div className=" gap-5 container flex justify-center items-center flex-col  text-black ">
          {routers.map((item) => (
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
      <div className="container m-auto flex justify-between  items-center">
        <div className="flex gap-1  items-center">
          <BsFillBagCheckFill className="font-medium text-xl text-gray-500" />
          <Link
            to="/"
            className="font-extrabold text-xl text-slate-800 font-mono"
          >
            E-SHOP
          </Link>
        </div>
        <div className=" gap-2 hidden md:flex ">
          {routers.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-extrabold text-md " : "text-md font-semibold "
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
              {JSON.parse(localStorage.getItem("cartItem"))?.length|| 0}
            </span>
            <Link to="/Cart">
              <AiOutlineShoppingCart className="w-6 h-6" />
            </Link>
          </div>
          <div className="relative">
            <img
              className="w-8 h-8 rounded-full cursor-pointer"
              src={currentUser ? currentUser.photoURL : user}
              alt=""
              onClick={togleM}
            />
            <div
              onClick={togleM}
              ref={togle}
              className="bg-gray-500 hidden  absolute cursor-pointer bottom-[-200%] -right-16 px-8 py-1 rounded-md  flex-col gap-3 text-slate-200 "
            >
              <div>
                {!currentUser ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/Signup">signup</Link>
                    <Link to="/Login">login</Link>
                    <Link to="/DashBoard">DashBoard</Link>
                  </div>
                ) : (
                  <button onClick={logOut}>logOut</button>
                )}
              </div>
            </div>
          </div>

          <div className="ml-4">
            <AiOutlineMenu
              onClick={OpenMenu}
              className="text-xl cursor-pointer font-bold text-slate-800 md:hidden "
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
