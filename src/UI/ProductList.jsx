
import ProductCart from "./ProductCart";

export default function ProductList({data}) {
 

  return (
    <div className="w-fit mx-auto  grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {data?.length == 0 ? (
        <p className="flex col-span-full my-3 text-slate-600  font-semibold text-xl  text-center">
          no items
        </p>
      ) : (
        data?.map((prd) => <ProductCart key={prd.id} items={prd} />)
      )}
    </div>
  );
}
