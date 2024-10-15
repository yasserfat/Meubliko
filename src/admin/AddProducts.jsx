import { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [newProductdata, setNewProductdata] = useState({
    productName: "",
    imgUrl: '',
    category: "",
    price: 0,
    shortDesc: '',
    description: '',
  });

  const handelChange = (e) => {
    setNewProductdata({ ...newProductdata, [e.target.name]: e.target.value });
  };

  const handelUpload = async (e) => {
    setLoad(true);
    e.preventDefault();

    try {
      const storeRef = ref(storage, `productsImages/${Date.now() + newProductdata.imgUrl.name}`);
      const uploadTask = uploadBytesResumable(storeRef, newProductdata.imgUrl);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Monitor progress of the upload here
        },
        (error) => {
          toast.error('Image upload failed');
          setLoad(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Create Firestore document only after image is uploaded
          await addDoc(collection(db, "products"), {
            ...newProductdata,
            imgUrl: downloadURL,  // Set image URL in Firestore document
          });
          
          toast.success("Product added successfully");
          setLoad(false);
          navigate("/DashBoard/AllProducts");
        }
      );
    } catch (error) {
      toast.error('Error adding product');
      console.error(error);
      setLoad(false);
    }
  };
  return (
    <div className="p-4">
     { load?<h1>loading ....</h1>: <div className="container m-auto ">
        <h1 className="font-poppins mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
          Add product
        </h1>
        <form onSubmit={handelUpload} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-red-300/80 font-semibold">product title</span>
            <input
              required
              type="text"
              onChange={handelChange}
              className="px-6 py-2 focus:outline-none border-[3px] rounded-lg "
              placeholder="product title"
              name="productName"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-red-300/80 font-semibold">
              short description
            </span>
            <input
              onChange={handelChange}
              type="text "
              className="px-6 py-2 focus:outline-none border-[3px] rounded-lg "
              placeholder="short description"
              name="shortDesc"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-red-300/80 font-semibold">description</span>
            <input
              required
              onChange={handelChange}
              type="text "
              className="px-6 py-2 focus:outline-none border-[3px] rounded-lg "
              placeholder="description"
              name="description"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-red-300/80 font-semibold">Price</span>
            <input
              required
              onChange={handelChange}
              type="number "
              className="px-6 py-2 focus:outline-none border-[3px] rounded-lg "
              placeholder="Price"
              name="price"
            />
          </div>
          <div className="">
            <span className="text-red-300/80 font-semibold block mb-2">
              category
            </span>

            <select
              required
              name="category"
              onChange={handelChange}
              className=" bg-slate-800 focus:outline-none rounded text-slate-100 block p-2 text-lg"
            >
              <option value="sofa">sofa</option>
              <option value="wireless">wireless</option>
              <option value="chair">chair</option>
              <option value="mobile">mobile</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-red-300/80 font-semibold">Product image</span>
            <input
              onChange={(e) =>
                setNewProductdata({
                  ...newProductdata,
                  [e.target.name]: e.target.files[0],
                })
              }
              name="imgUrl"
              type="file"
              className="px-6 py-2 focus:outline-none border-[3px] rounded-lg "
              placeholder="Product image"
            />
          </div>
          <button
            onClick={handelUpload}
            className="bg-slate-800 rounded px-6 py-2 font-semibold text-slate-100 mt-6"
          >
            add product
          </button>
        </form>
      </div>}
    </div>
  );
}
