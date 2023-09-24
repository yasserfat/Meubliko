import { AiFillDelete } from "react-icons/ai";
import { db } from "../firebase/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import UsegetProductData from "../custem-hooks/getProductData";
export default function Users() {
  const { data, loader } = UsegetProductData("users");
  console.log(data);
   const deleteItem = async (id) => { 
     await deleteDoc(doc(db, "users", id));
   };
  return (
    <div>
      <table className="container m-auto p-4 ">
        <thead className="shadow-gray-400 border-b-gray-300  border-b-[2px] p-8 ">
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>email </th>
         
            <th>Delete</th>
          </tr>
        </thead>
        {!loader ? (
          <h1 className="h-screen text-center">loading ...</h1>
        ) : (
          <tbody className="p-4">
            {data.map((item) => {
              return (
                <tr key={item.id} className="space-y-14">
                  <th>
                    <img className="h-32 w-32 md:h-40" src={item.photoURL} alt="" />
                  </th>
                  <th className="text-sm md:text:lg font-semibold">
                    {item.displayName}
                  </th>
                  <th className="text-sm md:text:lg font-semibold">
                    {item.email}
                  </th>
            
                  <th className="text-red-600 text-xl cursor-pointer">
                    <AiFillDelete onClick={() => deleteItem(item.id)} />
                  </th>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}
