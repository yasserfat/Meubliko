import { useSelector } from "react-redux";
import ProductCart from "./ProductCart";
import realProduct from "../assets/data/RealProducts";

import noItemsImg from "../assets/images/no-items.avif";

export default function ProductList({ data }) {
  const { lang } = useSelector((store) => store.cart);
  console.log(data, "langdata");

  return (
    <div className="w-fit mx-auto  grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {data?.length == 0 ? (
        <div>
          <img
            src={noItemsImg}
            alt="No items"
            className="w-[300px] mx-auto mb-4"
          />
          <span className="text-xl font-semibold">No items available.</span>
        </div>
      ) : (
        realProduct[lang]?.map((prd) => (
          <ProductCart key={prd.id} items={prd} />
        ))
      )}
    </div>
  );
}
