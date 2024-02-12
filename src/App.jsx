import Layout from "./components/Layout";
import { useDispatch,useSelector } from "react-redux";
import {
  getAllData,
  mergeData,
  mergeCartItemToFirestore,
  total,
} from "./redux/slice/CounterSlice";
import { useEffect } from "react";
import UsegetProductData from "./custem-hooks/getProductData";
import UseAuth from "./custem-hooks/UserAuth";

function App() {
  const { finalCartItems } = useSelector((store) => store.cart);

    const { currentUser } = UseAuth();
  const dispatch = useDispatch()
   const { data, loader } = UsegetProductData("users");
console.log(data.find((item) => item.id == currentUser?.uid)?.cartItems, "aziz");
   useEffect(() => {
     dispatch(
       getAllData({
         data: data.find((item) => item.id == currentUser?.uid)?.cartItems,
         isLogedIn: currentUser?.emailVerified,
       })
     );
     dispatch(mergeData());
     console.log(finalCartItems, "finalCartItems");
     dispatch(mergeCartItemToFirestore(currentUser?.uid));
     dispatch(total())

   }, [data, currentUser?.emailVerified]);
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
