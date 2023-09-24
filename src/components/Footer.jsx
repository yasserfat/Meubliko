import { BsFillBagCheckFill } from "react-icons/bs";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiLocationPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer className="p-8 mt-4 bg-[#091a37] text-gray-400 ">
      <div className="container grid gap-4 m-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex gap-1 items-center  ">
            <BsFillBagCheckFill className="font-normal text-xl text-gray-500" />
            <Link
              to="/"
              className="font-bold text-2xl text-slate-600 font-poppins"
            >
              E-SHOP
            </Link>
          </div>
          <p className="mt-3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elie.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-xl text-slate-200 mb-3">
            Top categories
          </h2>
          <ul className="flex flex-col  justify-start gap-1">
            <li>Mobile Phone</li>
            <li>Modern Sofa</li>
            <li>arm chair</li>
            <li>smart watches</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl text-slate-200 mb-3">
            usefull links
          </h2>
          <ul className="flex flex-col  justify-start gap-1">
            <li>
              <Link to="/Shop">Shop</Link>
            </li>
            <li>
              <Link to="/Cart">Cart</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Cart">Privicy policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl text-slate-200 mb-3">contact</h2>
          <ul className="flex flex-col   gap-3">
            <li className=" flex gap-1 items-center ">
              <BiLocationPlus />
              setif, Algeria
            </li>
            <li className=" flex gap-1 items-center ">
              {" "}
              <AiFillPhone />
              +213669282074
            </li>
            <li className=" flex gap-1 items-center ">
              {" "}
              <AiOutlineMail />
              yasserfat9@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
