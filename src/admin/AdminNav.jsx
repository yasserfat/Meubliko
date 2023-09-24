import { Link, NavLink } from "react-router-dom";
import { AiFillSetting, AiFillAlert } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import user from '../assets/images/user-icon.png'

export default function AdminNav() {
     const adminRouters = [
       {
         path: "/DashBoard",
         element: "DashBoard",
       },
       {
         path: "/DashBoard/AllProducts",
         element: "AllProducts",
       },
       {
         path: "/DashBoard/AddProducts",
         element: "AddProducts",
       },
       {
         path: "/DashBoard/Users",
         element: "Users",
       },
     ];
  return (
    <>
      <header className="bg-blue-200 p-4">
        <div className="container m-auto flex justify-between gap-8 items-center">
          <div className="flex gap-1  items-center">
            <BsFillBagCheckFill className="font-medium text-xl text-gray-500" />
            <Link
              to="/"
              className="font-extrabold text-xl text-slate-800 font-mono"
            >
              E-SHOP
            </Link>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="focus:outline-none border rounded px-6 py-[5px] w-full"
              placeholder="search..."
            />
          </div>
          <ul className="flex gap-4 items-center">
            <li>
              <AiFillSetting className="text-lg" />
            </li>
            <li>
              <AiFillAlert className="text-lg" />
            </li>
            <li>
              <img src={user} className="w-8" alt="" />
            </li>
          </ul>
        </div>
      </header>
      <section className="p-2 bg-red-300/70">
        <div className="container text-slate-700 m-auto flex justify-center items-center gap-5">
          {adminRouters.map((item) => (
            <NavLink

              className={({ isActive }) =>
                isActive ? "font-bold " : " font-semibold "
              }
              to={item.path}
              key={item.path}
             
            >
              {item.element}
            </NavLink>
          ))}
        </div>
      </section>
    </>
  );
}
