import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import ChechOut from "../pages/ChechOut";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Protected from "./Protected";
import SignUp from "../pages/SignUp";
import AddProducts from "../admin/AddProducts";
import AllProducts from "../admin/AllProducts";
import DashBoard from "../admin/DashBoard";
import Users from "../admin/Users";
import Verifey from "../pages/Verifey";
import ContactUs from "../components/ContactUs";
export default function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/" element={<Protected />}>
        <Route path="Cart/ChechOut" element={<ChechOut />} />
        <Route path="DashBoard/AllProducts" element={<AllProducts />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="DashBoard/AddProducts" element={<AddProducts />} />
        <Route path="DashBoard/Users" element={<Users />} />
      </Route>
      <Route path="/ContactUs" element = {<ContactUs/>} />
      <Route path="/Shop/:id" element={<ProductDetails />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Verifey" element={<Verifey />} />
    </Routes>
  );
}
