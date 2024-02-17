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
      <section className="px-4 py-8 md:py-20 bg-[#ffe8e8] ">
        <div className="container flex flex-col m-auto md:flex-row justify-center gap-8 items-center  ">
          <div className="flex flex-col gap-4 md:w-1/2 ">
            <p className="text-md md:text-lg text-gray-600 font-medium">
              {content[lang].landing.shortDesc}
              <span className="mx-1">{dateYear}</span>
            </p>
            <h1 className="font-poppins text-slate-700 text-2xl md:text-3xl font-bold flex flex-wrap">
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
      <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
        {content[lang].title.services}
      </h1>
      <Services />
      {!loader ? (
        <Loader />
      ) : (
        <div>
          {" "}
          <section className="bg-[#ffb1b1] text-center  p-8 mt-4">
            <div
              className={`container flex flex-col  justify-between ${
                lang == "ar" ? "md:flex-row-reverse" : "md:flex-row"
              } gap-3 items-center m-auto `}
            >
              <div className="flex flex-col items-center  w-full justify-center ">
                <h1 className="font-poppins mb-4 text-slate-800 text-2xl font-bold flex items-center justify-center flex-wrap">
                  {content[lang].title.offers}
                </h1>

                <p className="text-gray-500 font-semibold text-lg my-2">
                  {content[lang].title.limited}
                </p>
                <Counter />
                <div className="flex justify-center  items-center">
                  <Link
                    className=" flex  w-fit bg-slate-700 rounded-lg text-white px-6 py-2 text-center mt-4 font-semibold  "
                    to="/Shop"
                  >
                    {content[lang].landing.btn}
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="container m-auto ">
            <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              {content[lang].title.trend}
            </h1>
            <div className="">
              {!loader ? <Loader /> : <ProductList data={realProduct[lang]} />}
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
