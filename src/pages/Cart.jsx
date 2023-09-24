import Halmet from "../components/Halmet";
import CommenSection from "../components/CommenSection";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import {} from "react-redux";
import {
  addCartItemToFirestore,
  deleteItem,
  concaticatData,
} from "../redux/slice/CounterSlice";
import { Link } from "react-router-dom";
import UsegetProductData from "../custem-hooks/getProductData";
import UseAuth from "../custem-hooks/UserAuth";
import { useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";
export default function Cart() {
  const { totalAmount } = useSelector((cart) => cart.cart);
  const { currentUser } = UseAuth();
  const dispatch = useDispatch();
  const { data: cartIm, loader } = UsegetProductData("users");

  const [cartItems, setCartItem] = useState([]);
  const [load, setLoader] = useState(loader);
  const [isLogedIn, setIsLogedIn] = useState(currentUser?.emailVerified);
  useEffect(() => {
    console.log(currentUser?.emailVerified);
    if (currentUser?.emailVerified && loader) {
      console.log(cartIm[0]?.cartItems, "?????@@2222");
      dispatch(
        concaticatData({
          cartItem: cartItems,
          id: currentUser.uid,
        })
      );
    }
    setCartItem(
      localStorage.getItem("cartItem")
        ? JSON.parse(localStorage.getItem("cartItem"))
        : []
    );
    console.log(JSON.parse(localStorage.getItem("cartItem")), "++++");

    setIsLogedIn(currentUser?.emailVerified);
  }, [currentUser, loader]);
  function handelDeleteItems(item) {
    dispatch(deleteItem(item));
    if (currentUser?.emailVerified) {
      dispatch(addCartItemToFirestore(currentUser?.uid));
    }
  }
  return (
    <Halmet title="cart">
      <CommenSection title="cart" />
      {!loader ? (
        <h1>loading ....</h1>
      ) : (
          currentUser?.emailVerified
            ? cartIm[0]?.cartItems?.length === 0
            : cartItems?.length === 0
        ) ? (
        <h1 className="text-3xl text-slate-950 font-bold text-center p-12">
          No product
        </h1>
      ) : (
        <div className="px-8 py-4 gap-8 flex flex-col lg:flex-row ">
          <table className="container m-auto p-4 ">
            <thead className="shadow-gray-400 border-b-gray-300  border-b-[2px] p-8 ">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price </th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="p-4">
              {(isLogedIn
                ? cartIm[0]?.cartItems
                : JSON.parse(localStorage.getItem("cartItem"))
              )?.map((item) => {
                return (
                  <tr key={item.id} className="space-y-14">
                    <th>
                      <img className="w-32 md:w-40" src={item.imgUrl} alt="" />
                    </th>
                    <th className="text-sm md:text:lg font-semibold">
                      {item.productName}
                    </th>
                    <th className="text-sm md:text:lg font-semibold">
                      {item.price}
                    </th>
                    <th className="text-sm md:text:lg font-semibold">
                      {item.quantity}
                    </th>
                    <th className="text-red-600 text-xl cursor-pointer">
                      <AiFillDelete onClick={() => handelDeleteItems(item)} />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="shadow-md shadow-gray-500 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">SUBTOTAL</h1>
              <p className="text-xl font-bold">
                {" "}
                <span className="mr-1">$</span>
                {totalAmount}
              </p>
            </div>
            <p className="text-gray-600 mt-4 mb-8">
              taxes and shipping fees will be calculaed in checkout{" "}
            </p>
            <Link
              to="/Cart/ChechOut"
              className="bg-slate-800 text-center px-6 mb-4 py-2 text-slate-100 rounded-md block w-full font-bold text-lg"
            >
              checkout
            </Link>
            <Link
              to="/Shop"
              className="bg-slate-800 text-center px-6 py-2 text-slate-100 rounded-md block w-full font-bold text-lg"
            >
              continue shopping{" "}
            </Link>
          </div>
        </div>
      )}
    </Halmet>
  );
}
