import CommenSection from "../components/CommenSection";
import Halmet from "../components/Halmet";
import {  useSelector } from "react-redux";
export default function ChechOut() {
  const { totalAmount, cartItem } = useSelector((cart) => cart.cart);
  return (
    <Halmet title="Checkout">
      <CommenSection title="Checkout" />
      <div className="px-4 py-8">
        <div className="container flex flex-col justify-center items-center md:flex-row md:justify-between gap-8">
          <div className="w-full">
            <h1 className="font-poppins my-8 text-slate-900 text-2xl font-bold ">
              billing information
            </h1>
            <form className="">
              <input
                type="text"
                placeholder="Your name"
                className="w-full my-3  px-5 py-2 border focus:outline-none   rounded "
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-5  my-3 py-2 border focus:outline-none w-full  rounded "
              />
              <input
                type="number"
                placeholder="Phone number"
                className="px-5  my-3 py-2 border focus:outline-none w-full rounded "
              />
              <input
                type="text"
                placeholder="Street adress"
                className="px-5  my-3 py-2 border focus:outline-none w-full rounded "
              />
              <input
                type="text"
                placeholder="City"
                className="px-5 py-2 border focus:outline-none w-full md:2/3 rounded "
              />
              <input
                type="text"
                placeholder="Postal code"
                className="px-5  my-3 py-2 border focus:outline-none w-full  rounded "
              />
              <input
                type="text"
                placeholder="Country"
                className="px-5  my-3 py-2 border focus:outline-none w-full  rounded "
              />
            </form>
          </div>
          <div className="bg-slate-800 text-slate-100 p-6 rounded-md shadow-md shadow-gray-300 w-full md:w-2/5">
            <div className="flex justify-between items-center mb-2 gap-8">
              <span className="text-lg font-semibold">Amount :</span>
              <span className="text-lg font-semibold">{cartItem.length}</span>
            </div>
            <div className="flex justify-between items-center mb-2 gap-8">
              <span className="text-lg font-semibold">total Price</span>
              <span className="text-lg font-semibold"><span className="mr-1">$</span>{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center mb-2 gap-8">
              <span className="text-lg font-semibold">Shipping</span>
              <span className="text-lg font-semibold">Free</span>
            </div>
            <hr />
            <div className="flex justify-between items-center  my-4 gap-8">
              <h2 className="text-xl font-bold"> Total Cost</h2>
              <span className="text-lg font-semibold"><span className="mr-1">$</span>{totalAmount}</span>
            </div>
            <button className="bg-slate-100 text-slate-700 rounded px-6 py-2 shadow shadow-gray-500 w-full text-lg font-bold text-center">place an order</button>
          </div>
        </div>
      </div>
    </Halmet>
  );
}
