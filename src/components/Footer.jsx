import { IoMdSend } from "react-icons/io";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="px-8 pt-[50px] bg-[#091a37] text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[30px]">
        <div>
          <h1 className="text-xl font-bold">Exclusive</h1>
          <h2 className="my-[15px]">S'abonner</h2>
          <p className="text-gray-400">Obtenez 10% de réduction sur votre première commande</p>
          <div className="mt-[15px] px-[10px] py-[5px] rounded-lg border border-white flex items-center justify-between gap-[15px] flex-row flex-nowrap">
            <input
              className="outline-none bg-transparent flex-1"
              type="text"
              placeholder="Enter your email"
            />
            <IoMdSend className="text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold">Support</h1>
          <ul className="flex flex-col gap-[15px] mt-[15px] text-gray-400">
            <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
            <li>exclusive@gmail.com</li>
            <li>+88015-88888-9999</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold">Account</h1>
          <ul className="flex flex-col gap-[15px] mt-[15px] text-gray-400">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold">Quick Link</h1>
          <ul className="flex flex-col gap-[15px] mt-[15px] text-gray-400">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold">Social Media</h1>
          <ul className="flex flex-row gap-[20px] mt-[30px] text-gray-400">
            <li>
              <FaFacebook className="text-xl" />
            </li>
            <li>
              <FaInstagram className="text-xl" />
            </li>
            <li>
              <FaTwitter className="text-xl" />
            </li>
            <li>
              <FaLinkedin className="text-xl" />
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-[50px] text-center text-gray-400 border-t border-gray-400 py-[20px]">Copyright Meubliko 2024. All right reserved</p>
    </footer>
  );
}
