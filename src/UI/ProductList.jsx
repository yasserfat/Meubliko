
import ProductCart from "./ProductCart";

export default function ProductList({data}) {
 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center w-full mb-6">
      {data?.length == 0 ?<h1>no items</h1> :data?.map((prd) => (
        <ProductCart key={prd.id} items={prd} />
      ))}
    </div>
  );
}
