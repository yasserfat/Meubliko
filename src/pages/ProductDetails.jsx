import { useEffect, useRef, useState } from "react";
import {
  addCartItemToFirestore,
  addItem,
  addToLocalStorage,
} from "../redux/slice/CounterSlice";
import { useDispatch } from "react-redux";
import Halmet from "../components/Halmet";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import products from "../assets/data/products";
import { useParams } from "react-router-dom";
import CommenSection from "../components/CommenSection";
import ProductList from "../UI/ProductList";
import { toast } from "react-toastify";
import { db } from "../firebase/firebaseConfig";
import { collection,addDoc,doc } from "firebase/firestore";
import UsegetProductData from "../custem-hooks/getProductData";
import UseAuth from "../custem-hooks/UserAuth";
import products from "../assets/data/products";
export default function ProductDetails() {
       const { currentUser } = UseAuth();
       
    
  //  const { data: products, loader } = UsegetProductData("products");
  const loader = true;
   const { data: rating } = UsegetProductData("ratings");
  //  const [productsData, setProductsData] = useState(products);

const [comments,setComments] = useState(rating)
  
  const userReview = useRef('');
  const userMsg = useRef('');
  const [filtred, setFiltred] = useState(products);
  const [ratingVal, setRatingVal] = useState(5);
  const [ratingData, setRatingData] = useState([
    {
      rate: 1,
      state: true,
    },
    {
      rate: 2,
      state: true,
    },
    {
      rate: 3,
      state: true,
    },
    {
      rate: 4,
      state: true,
    },
    {
      rate: 5,
      state: true,
    },
  ]);
  const { id } = useParams();
  const item = products.find((item) => item.id == id);
  
  useEffect(() => {
    setFiltred(products.filter((prd) => prd.category === item.category));
  }, [item]);
 const handleSubmit = async(e) => {
   e.preventDefault(); 
   const reviewMsg = userMsg.current.value;
   const reviewUser = userReview.current.value;
   const reviewObj = {
    reviewMsg,
    reviewUser,
    ratingVal,
    filtrProperty:item.id
   }
   try {
    const collections = collection(db,'ratings')
    await addDoc(collections,reviewObj)
    
   } catch (error) {
    console.error(error)
   }
   toast.success("review added successfuly")
  //  console.log(reviewObj)
 };

  const dispatch = useDispatch();
  const [tab, setTab] = useState("desc");
  useEffect(()=> {
  setComments(rating.filter(pro => pro.filtrProperty == item.id))
  },[rating])
  
  const reviews = comments.map((rev, i) => (
    <div key={i} className="bg-gray-200 rounded-md py-2 px-5 ">
      <h1 className="text-md font-poppins font-bold mb-1">{rev.reviewUser}</h1>
      <p className="text-orange-500 ">
        (<span className="mr-1 font-semibold">rating</span>
        {rev.ratingVal})
      </p>
      <p className="text-slate-800">{rev.reviewMsg}</p>
    </div>
  ));
  const handleRating = (e) => {
    setRatingVal(e);
    setRatingData((prevRatingData) =>
      prevRatingData.map((item) => ({
        ...item,
        state: e >= item.rate,
      }))
    );
  };

function handelCartData(item) {
  console.log(item)
  dispatch(addItem(item));
  if (currentUser?.emailVerified) {
    dispatch(addCartItemToFirestore(currentUser?.uid));
  } else {
    dispatch(addToLocalStorage());
  }
}
  return (
    <Halmet title={item?.productName}>
      <CommenSection title={item?.productName} />
      {!loader ? (
        <h1>loading ...</h1>
      ) : (
        <section className="p-4">
          <div className="container m-auto flex items-center flex-col md:flex-row justify-between ">
            <div className="w-full md:w-1/2">
              <img className="w-full md:w-2/3" src={item.imgUrl} alt="" />
            </div>
            <div className="p-3 flex-1">
              <h1 className="text-3xl font-poppins text-slate-950 font-semibold mb-2">
                'kk'
              </h1>
              <div className="flex gap-3 items-center">
                <div className="flex gap-1">
                  <AiFillStar className="text-orange-500 font-bold text-lg" />
                  <AiFillStar className="text-orange-500 font-bold text-lg" />
                  <AiFillStar className="text-orange-500 font-bold text-lg" />
                  <AiFillStar className="text-orange-500 font-bold text-lg" />
                  <AiOutlineStar className="text-orange-500 font-bold text-lg" />
                </div>
                <p className="font-medium mr-2">
                  ( <span className="font-medium mr-2">{item.avgRating}</span>)
                </p>
              </div>
              <p className="text-lg font-semibold text-slate-950 my-2">
                <span>$</span>
                {item.price}
              </p>
              <p className="text-gray-600 text-md">{item.shortDesc}</p>
              <button
                onClick={() => {handelCartData(item)}}
                className="bg-slate-900 text-slate-100 rounded-md flex px-6 py-2 mt-3 shadow-md shadow-slate-500"
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="p-4  container m-auto ">
            <ul className="flex gap-3 py-4 container m-auto">
              <li
                onClick={() => setTab("desc")}
                className={`text-slate-950 cursor-pointer text-lg ${
                  tab === "desc"
                    ? "font-extrabold  text-orange-500"
                    : "font-semibold"
                } `}
              >
                description
              </li>
              <li
                onClick={() => setTab("rev")}
                className={`text-slate-900 cursor-pointer text-lg ${
                  tab === "rev"
                    ? "font-extrabold  text-orange-500"
                    : "font-semibold"
                } `}
              >
                reviews{" "}
              </li>
            </ul>
            <div className="container m-auto">
              {tab === "desc" ? (
                <p className="text-gray-600 mt-3">{item.description}</p>
              ) : (
                <div>
                  <div className="gap-3 grid grid-col-1 items-center justify-items-center p-4 sm:grid-cols-2 md:grid-cols-3">
                    {reviews}
                  </div>
                  <div className="flex justify-center items-center flex-col p-2 gap-2 w-full">
                    <h1 className="text-3xl text-slate-950 font-bold text-center p-12">
                      Add review
                    </h1>

                    <form
                      onSubmit={(e) => handleSubmit(e)}
                      className="flex gap-4 justify-center items-center flex-col p-2 w-full"
                    >
                      <div className="flex gap-4 items-center">
                        <div className="flex gap-2">
                          {ratingData.map((item, i) => {
                            return item.state ? (
                              <AiFillStar
                                key={i}
                                onClick={() => handleRating(item.rate)}
                              />
                            ) : (
                              <AiOutlineStar
                                key={i}
                                onClick={() => handleRating(item.rate)}
                              />
                            );
                          })}
                        </div>
                        <p className="text-lg font-bold ">( {ratingVal})</p>
                      </div>
                      <input
                        ref={userMsg}
                        required
                        type="text"
                        className="w-full md:w-1/2 px-6 py-2 focus:outline-none border rounded"
                        placeholder="Your name ..."
                      />

                      <textarea
                        required
                        ref={userReview}
                        type="text"
                        className="w-full md:w-1/2 px-6 py-2 focus:outline-none border rounded"
                        placeholder="Your comment ..."
                      />
                      <button className="bg-slate-900 text-slate-100 rounded-md flex px-6 py-2 mt-3 shadow-md shadow-slate-500">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
          <section className="container m-auto ">
            <h1 className="font-poppins mt-8 ml-8 text-slate-900 text-2xl font-bold flex items-center justify-start flex-wrap">
              You might also like
            </h1>
            <div className="">
              <ProductList data={filtred} />
            </div>
          </section>
        </section>
      )}
    </Halmet>
  );
}
