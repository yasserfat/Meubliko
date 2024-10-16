import CommenSection from "../components/CommenSection";
import Halmet from "../components/Halmet";
// import products from "../assets/data/products";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import ProductList from "../UI/ProductList";
import UsegetProductData from "../custem-hooks/getProductData";
import Loader from "../components/LoaderComp";
import products from "../assets/data/products";
import { content } from "../assets/data/content";
import { useSelector } from "react-redux";

import loadingGif from "../assets/images/shopping-loader.gif";

export default function Shop() {
  // const { loader } = UsegetProductData("products");
  const loader = true;
  const [productsData, setProductsData] = useState(products);

  useEffect(() => {
    // This useEffect runs when 'products' changes
    setProductsData(products);
  }, [products]);
  const Filter = (e) => {
    const value = e.target.value;
    if (value === "sofa") {
      setProductsData(products.filter((item) => item.category === value));
    } else if (value === "chair") {
      setProductsData(products.filter((item) => item.category === value));
    } else if (value === "wireless") {
      setProductsData(products.filter((item) => item.category === value));
    } else if (value === "watch") {
      setProductsData(products.filter((item) => item.category === value));
    } else if (value === "mobile") {
      setProductsData(products.filter((item) => item.category === value));
    } else if (value === "") {
      setProductsData(products);
    }
  };
  const handelSerach = (e) => {
    const value = e.target.value;
    setProductsData(
      products.filter((item) =>
        item.productName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
    );
  };
  const { lang } = useSelector((store) => store.cart);
  return (
    <Halmet title="shop">
      <CommenSection title={content[lang].title.trend} />

      <section className="p-4 my-4">
        <div className="flex justify-between items-center flex-col gap-4 container m-auto">
          <div className="flex justify-around w-full"></div>
          <div className="flex items-center w-full">
            <input
              onChange={handelSerach}
              className="focus:outline-none w-full py-2 h-10 px-2 border rounded-md "
              placeholder="Serach..."
              type="text"
            />
            <AiOutlineSearch
              className="text-4xl bg-slate-900 h-10 -ml-3 text-white rounded-tr-md  rounded-br-md 
            p-2"
            />
          </div>
        </div>
      </section>

      <section className="container m-auto ">
        <div className="">
          {!loader ? (
            <div className="flex items-start justify-center">
              <img src={loadingGif} alt="loading-gif" />
            </div>
          ) : (
            <ProductList data={productsData} />
          )}
        </div>
      </section>
    </Halmet>
  );
}
