import { useEffect, useState } from "react";
import homeImg from "../assets/images/hero-img.png";
import Halmet from "../components/Halmet.jsx";
import { Link } from "react-router-dom";
import Services from "../services/Services";
import ProductList from "../UI/ProductList";
import Counter from "../components/Counter";
import limitedImg from "../assets/images/counter-timer-img.png";
import UsegetProductData from "../custem-hooks/getProductData";
export default function Home() {
   
  const dateYear = new Date().getFullYear();
  const { data: products, loader } = UsegetProductData("products")
  const [trendList, setTrendList] = useState([products]);
  const [bestSales, setBestSales] = useState(products);
  const [populer, setPopuler] = useState(products);
  const [WireLessAndMobile, setWireLessAndMobile] = useState(products);

  useEffect(() => {
    const filtredWireLessAndMobile = products.filter(
      (item) => item.category === "wireless" || item.category === "mobile"
    );
    const filtredTrend = products.filter((item) => item.category === "chair");
    const filtredSales = products.filter((item) => item.category === "sofa");
    const filtredPopuler = products.filter(
      (item) => item.category === "watch"
    );
    setWireLessAndMobile(filtredWireLessAndMobile);
    setTrendList(filtredTrend);
    setBestSales(filtredSales);
    setPopuler(filtredPopuler);
  }, [products]);
  return (
    <Halmet title="home ">
      <section className="px-4 py-8 bg-[#d3e2fd]">
        <div className="container flex flex-col md:flex-row justify-between gap-8 items-center m-auto ">
          <div className="flex flex-col gap-4 md:w-1/2">
            <p className="text-md md:text-lg text-gray-700 font-medium">
              Trending product in
              <span className="ml-1">{dateYear}</span>
            </p>
            <h1 className="font-poppins text-slate-900 text-2xl md:text-3xl font-bold flex flex-wrap">
              Make Your Interior More Minimalistic & Modern
            </h1>
            <p className="flex flex-wrap text-gray-600 text-md md:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              nulla repellat quo eaque alias corporis sunt, facilis nesciunt rem
              fugit!
            </p>
            <Link
              to="/Shop"
              className="bg-slate-800 rounded-md w-fit px-8 py-2 font-semibold text-slate-50 text-center my-4 shadow-slate-600"
            >
              SHOP NOW
            </Link>
          </div>
          <div className="md:w-1/2">
            <img src={homeImg} alt="" />
          </div>
        </div>
      </section>
      <Services />
      {!loader ? (
        <h1>loading....</h1>
      ) : (
        <div>
          {" "}
          <section className="container m-auto ">
            <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              Trending Product
            </h1>
            <div className="">
              {!loader ? (
                <h1>loading....</h1>
              ) : (
                <ProductList data={trendList} />
              )}
            </div>
          </section>
          <section className="container m-auto ">
            <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              Best Sales
            </h1>
            <div className="">
              {!loader ? (
                <h1>loading....</h1>
              ) : (
                <ProductList data={bestSales} />
              )}
            </div>
          </section>
          <section className="bg-[#091a37] p-8 mt-4">
            <div className="container flex flex-col md:flex-row justify-center gap-3 items-center m-auto ">
              <div className="flex flex-col ">
                <h1 className="text-gray-400 text-md font-medium mb-2">
                  Limited offer
                </h1>
                <h1 className="text-slate-100 text-xl font-medium mb-2">
                  High Quality
                </h1>
                <Counter />
                <div className="flex justify-center md:justify-start items-center">
                  <Link
                    className=" flex  w-fit bg-slate-200 rounded-lg text-slate-900 px-6 py-2 text-center mt-4 font-semibold  "
                    to="/Shop"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
              <div className="flex mt-5 md:justify-end">
                <img className="" src={limitedImg} alt="" />
              </div>
            </div>
          </section>
          <section className="container m-auto ">
            <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              New arrives
            </h1>
            <div className="">
              {!loader ? (
                <h1>loading....</h1>
              ) : (
                <ProductList data={WireLessAndMobile} />
              )}
            </div>
          </section>
          <section className="container m-auto ">
            <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
              populer in category
            </h1>
            <div className="">
              <ProductList data={populer} />
            </div>
          </section>
        </div>
      )}
    </Halmet>
  );
}
