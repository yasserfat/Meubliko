import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  addCartItemToFirestore,
  addItem,
  addToLocalStorage,
} from "../redux/slice/CounterSlice";
import { updateCurrentUser } from "firebase/auth";
import UseAuth from "../custem-hooks/UserAuth";
export default function ProductCart({ items }) {
  console.log(items,"items")
  const { currentUser } = UseAuth();
  const dispatch = useDispatch();
  function addItemtoCart(item) {
    dispatch(addItem(item));
    if (currentUser?.emailVerified) {
      dispatch(addCartItemToFirestore(currentUser?.uid));
    } else {
      dispatch(addToLocalStorage());
    }
  }

  return (
    <>
      {/* <div className="p-2 shadow-md shadow-slate-600 relative">
        <div className="w-full h-1/2 overflow-hidden">
          <img className="w-full " src={items.imgUrl} alt="" />
        </div>
        <div className="p-3">
          <Link to={`/Shop/${items.id}`}>
            <h1 className="text-md font-semibold">{items.productName}</h1>
            <p className="text-gray-600 font-medium">{items.category}</p>
          </Link>
          <div className=" flex justify-between items-center py-2">
            <span className="font-semibold">
              <span>$</span>
              {items.price}
            </span>
            <button
              onClick={() => addItemtoCart(items)}
              className="text-xl bg-slate-900 font-bold text-slate-100 w-6 flex justify-center items-center h-6 rounded-xl"
            >
              +
            </button>
          </div>
        </div>
      </div> */}
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <div>
          <Link to={`/Shop/${items.id}`}>
            <img
              src={items.imgUrl[0]}
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
          </Link>
          <div className="px-4 py-3 w-72">
            <Link to={`/Shop/${items.id}`}>
              <span className="text-gray-400 mr-3 uppercase text-xs">
                {items.productName}
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                {items.shortDesc}
              </p>
            </Link>

            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                {items.price}
              </p>
              <del></del>

              <div className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus z-80 cursor-pointer"
                  viewBox="0 0 16 16"
                  onClick={() => addItemtoCart(items)}
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
