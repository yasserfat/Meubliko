
import UsegetProductData from '../custem-hooks/getProductData'
import { AiFillDelete } from "react-icons/ai";
import { db } from '../firebase/firebaseConfig';
import { deleteDoc,doc } from 'firebase/firestore';
export default function AllProducts() {
  const { data, loader } = UsegetProductData("products");
  console.log(data)
  const deleteItem = async(id)=> {
    await deleteDoc(doc(db,'products',id))
  }
  return (
    <div>
      <table className="container m-auto p-4 ">
        <thead className="shadow-gray-400 border-b-gray-300  border-b-[2px] p-8 ">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price </th>
            <th>category</th>
            <th>Delete</th>
          </tr>
        </thead>
       {!loader?<h1 className='h-screen text-center'>loading ...</h1>: <tbody className="p-4">
          {data.map((item) => {
            return (
              <tr key={item.id} className="space-y-14">
                <th>
                  <img className="w-32 md:w-40" src={item.imgUrl} alt="" />
                </th>
                <th className="text-sm md:text:lg font-semibold">
                  {item.productName}
                </th>
                <th className="text-sm md:text:lg font-semibold">
                  <span className='mr-1'>$</span>{item.price}
                </th>
                <th className="text-sm md:text:lg font-semibold">
                  {item.category}
                </th>
                <th className="text-red-600 text-xl cursor-pointer">
                  <AiFillDelete onClick={() => deleteItem(item.id)} />
                </th>
              </tr>
            );
          })}
        </tbody>}
      </table>
    </div>
  );
}
