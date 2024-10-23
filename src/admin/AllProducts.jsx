import { AiFillDelete } from "react-icons/ai";
import { db } from "../firebase/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import loadingGif from "../assets/images/shopping-loader.gif";
import noItemsImg from "../assets/images/no-items.avif";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsSnapshot = await getDocs(collection(db, "products"));
        const fetchedItems = itemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(fetchedItems);
      } catch (error) {
        console.error("Error fetching items: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (itemId) => {
    console.log(itemId)
    try {
      const itemRef = doc(db, 'products', String(itemId));
      await deleteDoc(itemRef);
      console.log('Item successfully deleted');
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <div>
      <h1 className="mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
        Products List
      </h1>
      {loading ? (
        <div className="flex items-start justify-center">
          <img src={loadingGif} alt="loading-gif" />
        </div>
      ) : data.length > 0 ? (
        <table className="table-auto border-collapse w-full text-left my-8">
          <thead>
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Short Description</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <img
                    className="w-32 md:w-40"
                    src={item.mainImg}
                    alt={item.productName}
                  />
                </td>
                <td className="border px-4 py-2 text-sm md:text-lg font-semibold">
                  {item.productName}
                </td>
                <td className="border px-4 py-2 text-sm md:text-lg font-semibold">
                  {item.shortDesc}
                </td>
                <td className="border px-4 py-2 text-sm md:text-lg font-semibold">
                  {item.description}
                </td>
                <td className="border px-4 py-2 text-sm md:text-lg font-semibold">
                  {item.price} DA
                </td>
                <td className="border px-4 py-2 text-sm md:text-lg font-semibold">
                  {item.category.toUpperCase()}
                </td>
                <td className="border px-4 py-2 text-sm md:text-lg font-semibold">
                  {item.size.toUpperCase()}
                </td>
                <td className="border px-4 py-2 text-red-600 text-xl cursor-pointer">
                  <AiFillDelete onClick={() => deleteItem(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col my-[50px] items-center justify-center">
          <p className="mb-[10px] font-bold">No items available.</p>
          <img
            src={noItemsImg}
            alt="No items"
            className="w-[300px] mx-auto mb-4"
          />
        </div>
      )}
    </div>
  );
}
