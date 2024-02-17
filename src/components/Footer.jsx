import { BsFillBagCheckFill } from "react-icons/bs";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { BiLocationPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useSelector } from "react-redux";
import { content } from "../assets/data/content";
export default function Footer() {
  const { lang } = useSelector((store) => store.cart);
  return (
    <footer className="p-8 mt-4 bg-[#091a37] text-gray-400 ">
      <div className="container grid gap-4 m-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <div className="flex gap-1 items-center  ">
            {/* <BsFillBagCheckFill className="font-normal text-xl text-gray-500" /> */}
            <Link
              to="/"
              className="font-bold text-2xl text-slate-600 font-poppins"
            >
              Meubliko
            </Link>
          </div>
          <ul className="flex mt-3 space-x-4">
            <a
              href="https://web.facebook.com/Meubliko/?_rdc=1&_rdr"
              target="blank"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://web.facebook.com/Meubliko/?_rdc=1&_rdr"
              target="blank"
            >
              <FaInstagram className="text-2xl " />
            </a>
            <a
              href="https://web.facebook.com/Meubliko/?_rdc=1&_rdr"
              target="blank"
            >
              <FaYoutube className="text-2xl" />
            </a>
          </ul>
          <p className="mt-3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elie.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-xl text-slate-200 mb-3">
            {content[lang].title.useful}
          </h2>
          <ul className="flex flex-col  justify-start gap-1">
            {content[lang].header.routers.map((item, i) => (
              <li key={i}>
                <Link to={item.path}>{item.element}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl text-slate-200 mb-3">
            {" "}
            {content[lang].contact.title}
          </h2>
          <ul className="flex flex-col   gap-3">
            <li className=" flex gap-1 items-center ">
              <BiLocationPlus />
              {content[lang].contact.adress}
            </li>
            <li className=" flex gap-1 items-center ">
              {" "}
              <AiFillPhone />
              +213556437656
            </li>
            <li className=" flex gap-1 items-center ">
              {" "}
              <AiOutlineMail />
              aes.harmouche@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
