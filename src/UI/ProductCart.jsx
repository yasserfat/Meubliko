import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addCartItemToFirestore, addItem } from "../redux/slice/CounterSlice";
import { updateCurrentUser } from "firebase/auth";
import UseAuth from "../custem-hooks/UserAuth";
export default function ProductCart({ items }) {
  const { currentUser } = UseAuth();
  const dispatch = useDispatch();
  function addItemtoCart(item) {
   dispatch(addItem(item));
   if (currentUser?.emailVerified) {
     dispatch(addCartItemToFirestore(currentUser?.uid));
   } else {
     console.log("added to local stoarge");
   }
  }

  
  return (
    <div className="p-2 shadow-slate-600">
      <div className="w-full">
        <img className="w-full" src={items.imgUrl} alt="" />
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
    </div>
  );
}
