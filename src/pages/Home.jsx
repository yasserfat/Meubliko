import { useEffect, useState } from "react";
import homeImg from "../assets/images/double-sofa-02.png";
import Halmet from "../components/Halmet.jsx";
import { Link } from "react-router-dom";
import Services from "../services/Services";
import ProductList from "../UI/ProductList";
import Counter from "../components/Counter";
import limitedImg from "../assets/images/counter-timer-img.png";
import UsegetProductData from "../custem-hooks/getProductData";
import Loader from "../components/LoaderComp";
import products from "../assets/data/products.js";
import { content } from "../assets/data/content.js";
import { useSelector } from "react-redux";
import realProduct from "../assets/data/RealProducts.jsx";

import { IoIosWoman, IoIosMan } from "react-icons/io";
import { GiLargeDress } from "react-icons/gi";
import { GiWinterHat } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { FaRunning } from "react-icons/fa";
import { GiConverseShoe } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import { TbMoodKidFilled } from "react-icons/tb";

import loadingGif from "../assets/images/shopping-loader.gif";

export default function Home() {
  const dateYear = new Date().getFullYear();
  const { lang } = useSelector((store) => store.cart);
  console.log(lang, "lang");
  // const { data: products, loader } = UsegetProductData("products");
  const loader = true;
  const [trendList, setTrendList] = useState([products]);
  const [bestSales, setBestSales] = useState(products);
  const [populer, setPopuler] = useState(products);
  const [WireLessAndMobile, setWireLessAndMobile] = useState(products);

  useEffect(() => {
    const filtredWireLessAndMobile = products.filter(
      (item) => item.category === "sofa" || item.category === "sofa"
    );
    const filtredTrend = products.filter((item) => item.category === "chair");
    const filtredSales = products.filter((item) => item.category === "sofa");
    const filtredPopuler = products.filter((item) => item.category === "chair");
    setWireLessAndMobile(filtredWireLessAndMobile);
    setTrendList(filtredTrend);
    setBestSales(filtredSales);
    setPopuler(filtredPopuler);
  }, [products]);

  return (
    <Halmet title="home ">
      <section className="px-4 py-8 md:py-20 bg-[#ffe8e8] relative overflow-hidden ">
        <div className="container flex flex-col m-auto md:flex-row justify-center gap-8 items-center  ">
          <div className="flex flex-col gap-4 md:w-1/2 ">
            <p className="text-md md:text-lg text-gray-600 font-medium">
              {content[lang].landing.shortDesc}
              <span className="mx-1">{dateYear}</span>
            </p>
            <h1 className="text-slate-700 text-2xl md:text-3xl font-bold flex flex-wrap">
              {content[lang].landing.tille}
            </h1>
            <p className="flex flex-wrap text-gray-600 text-md md:text-lg">
              {content[lang].landing.desc}
            </p>
            <Link
              to="/Shop"
              className="bg-slate-800 rounded-md m-auto md:m-0 w-fit px-8 py-2 font-semibold text-slate-50 text-center my-4 shadow-slate-600"
            >
              {content[lang].landing.btn}
            </Link>
          </div>
          <div className="md:w-1/2 w-full">
            <img src={homeImg} alt="" />
          </div>
        </div>
      </section>
      <h1 className="mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
        {content[lang].title.services}
      </h1>
      <Services />
      {!loader ? (
        <div className="flex items-start justify-center">
          <img src={loadingGif} alt="loading-gif" />
        </div>
      ) : (
        <div>
          <section className="container m-auto">
            <h1 className="mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              Catégories
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[50px] my-[50px]">
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <IoIosWoman className="text-[30px]" />
                <h2>Women</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <TbMoodKidFilled className="text-[30px]" />
                <h2>Kids</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <IoIosMan className="text-[30px]" />
                <h2>Men</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <GiLargeDress className="text-[30px]" />
                <h2>Dresses</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <GiWinterHat className="text-[30px]" />
                <h2>Winter</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <IoHome className="text-[30px]" />
                <h2>Home</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <FaRunning className="text-[30px]" />
                <h2>Sport</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <GiConverseShoe className="text-[30px]" />
                <h2>Shoes</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <FaShoppingBag className="text-[30px]" />
                <h2>Bags</h2>
              </div>
              <div className="flex items-center justify-center flex-col border border-slate-900 hover:bg-[#fdede4] hover:text-gray-500 rounded-xl p-[30px] gap-[10px] cursor-pointer duration-200 ease-in-out">
                <FaMobile className="text-[30px]" />
                <h2>Electronics</h2>
              </div>
            </div>
          </section>
          <section className="container m-auto">
            <h1 className="mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              {content[lang].title.trend}
            </h1>
            <div className="">
              {!loader ? (
                <div className="flex items-start justify-center">
                  <img src={loadingGif} alt="loading-gif" />
                </div>
              ) : (
                <ProductList data={realProduct[lang]} />
              )}
            </div>
          </section>
          {/* <section className="container m-auto ">
            <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              Best Sales
            </h1>
            <div className="">
              {!loader ? <Loader /> : <ProductList data={bestSales} />}
            </div>
          </section> */}
          {/* <section className="container m-auto ">
            <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              New arrives
            </h1>
            <div className="">
              {!loader ? <Loader /> : <ProductList data={WireLessAndMobile} />}
            </div>
          </section> */}
          {/* <section className="container m-auto ">
            <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              populer in category
            </h1>
            <div className="">
              <ProductList data={populer} />
            </div>
          </section> */}
        </div>
      )}
    </Halmet>
  );
}
