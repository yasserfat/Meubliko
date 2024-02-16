
import { useSelector } from "react-redux";
import ProductCart from "./ProductCart";
import realProduct from "../assets/data/RealProducts";

export default function ProductList({data}) {
  const {lang} = useSelector(store=> store.cart)
 console.log(data,"langdata")

  return (
    <div className="w-fit mx-auto  grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {data?.length == 0 ? (
        <p className="flex col-span-full my-3 text-slate-600  font-semibold text-xl  text-center">
          no items
        </p>
      ) : (
        realProduct[lang]?.map((prd) => <ProductCart key={prd.id} items={prd} />)
      )}
    </div>
  );
}
