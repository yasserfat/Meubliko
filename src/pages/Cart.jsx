import Halmet from "../components/Halmet";
import CommenSection from "../components/CommenSection";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import {} from "react-redux";
import Loader from "../components/LoaderComp";
import {
  addCartItemToFirestore,
  addToLocalStorage,
  decrease,
  deleteItem,
  increase,
} from "../redux/slice/CounterSlice";
import { Link } from "react-router-dom";
import UsegetProductData from "../custem-hooks/getProductData";
import UseAuth from "../custem-hooks/UserAuth";
import { useEffect, useState } from "react";

import loadingGif from "../assets/images/shopping-loader.gif";

export default function Cart() {
  const { totalAmount, dataFromFireBase } = useSelector((cart) => cart.cart);
  const { currentUser } = UseAuth();
  const dispatch = useDispatch();
  const { data: cartIm, loader } = UsegetProductData("users");
  const [isLogedIn, setIsLogedIn] = useState(currentUser?.emailVerified);

  function handelDeleteItems(item) {
    dispatch(deleteItem(item));
    if (currentUser?.emailVerified) {
      dispatch(addCartItemToFirestore(currentUser?.uid));
    } else {
      dispatch(addToLocalStorage());
    }
  }
  function handelIncrease(item) {
    dispatch(increase(item));
    if (currentUser?.emailVerified) {
      dispatch(addCartItemToFirestore(currentUser?.uid));
    } else {
      dispatch(addToLocalStorage());
    }
  }
  function handelDecrease(item) {
    dispatch(decrease(item));
    if (currentUser?.emailVerified) {
      dispatch(addCartItemToFirestore(currentUser?.uid));
    } else {
      dispatch(addToLocalStorage());
    }
  }
  return (
    <Halmet title="cart">
      <CommenSection title="cart" />
      {!loader ? (
        <div className="flex items-start justify-center">
          <img src={loadingGif} alt="loading-gif" />
        </div>
      ) : (
          currentUser?.emailVerified
            ? dataFromFireBase?.length === 0
            : JSON.parse(localStorage.getItem("cartItem"))?.length === 0
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
              {(currentUser?.emailVerified
                ? dataFromFireBase
                : JSON.parse(localStorage.getItem("cartItem"))
              )?.map((item) => {
                return (
                  <tr key={item.id} className="space-y-14  text-center">
                    <th>
                      <img className="w-32 md:w-40" src={item.imgUrl} alt="" />
                    </th>
                    <th className="text-sm md:text:lg font-semibold">
                      {item.productName}
                    </th>
                    <th className="text-sm md:text:lg font-semibold">
                      {item.price}
                    </th>
                    <th className="text-sm md:text:lg font-semibold  text-center">
                      <span
                        className="mr-1 cursor-pointer  p-1 bg-slate-300 rounded "
                        onClick={() => handelIncrease(item)}
                      >
                        +
                      </span>
                      <span className="my-2"> {item.quantity}</span>
                      <span
                        onClick={() => handelDecrease(item)}
                        className=" p-1 cursor-pointer ml-2 bg-slate-300 rounded"
                      >
                        -
                      </span>
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
                {totalAmount?.toLocaleString().replace(/,/g, ",")}
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
