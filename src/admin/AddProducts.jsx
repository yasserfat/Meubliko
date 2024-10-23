import { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import loadingGif from "../assets/images/shopping-loader.gif";

export default function AddProducts() {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("sofa");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("s");
  const [mainImg, setMainImg] = useState("");
  const [imgOne, setImgOne] = useState("");
  const [imgTwo, setImgTwo] = useState("");
  const [imgThree, setImgThree] = useState("");
  const [imgFour, setImgFour] = useState("");

  const uploadImage = async (imageFile) => {
    const imageRef = ref(
      storage,
      `productsImages/${Date.now()}_${imageFile.name}`
    );
    const uploadTask = await uploadBytesResumable(imageRef, imageFile);
    return await getDownloadURL(uploadTask.ref);
  };

  const handelUpload = async () => {
    try {
      setLoad(true);

      const mainImageUrl = await uploadImage(mainImg);

      const imageOneUrl = imgOne ? await uploadImage(imgOne) : "";
      const imageTwoUrl = imgTwo ? await uploadImage(imgTwo) : "";
      const imageThreeUrl = imgThree ? await uploadImage(imgThree) : "";
      const imageFourUrl = imgFour ? await uploadImage(imgFour) : "";

      await addDoc(collection(db, "products"), {
        id: Math.random(),
        productName,
        shortDesc,
        description,
        price,
        category,
        color,
        size,
        mainImg: mainImageUrl,
        imgOne: imageOneUrl,
        imgTwo: imageTwoUrl,
        imgThree: imageThreeUrl,
        imgFour: imageFourUrl,
      });

      toast.success("Product added successfully");
      setLoad(false);
      navigate("/DashBoard/AllProducts");
    } catch (error) {
      toast.error("Error adding product");
      console.error(error);
      setLoad(false);
    }
  };

  return (
    <div className="p-4">
      {load ? (
        <div className="flex items-start justify-center">
          <img src={loadingGif} alt="loading-gif" />
        </div>
      ) : (
        <div className="container m-auto mb-[30px]">
          <h1 className="mt-8 text-slate-900 text-2xl font-bold flex items-center justify-center flex-wrap">
            Add product
          </h1>
          {/* <form onSubmit={handelUpload} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-red-300/80 font-semibold">
                product title
              </span>
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
              <span className="text-red-300/80 font-semibold">
                Product image
              </span>
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
          </form> */}
          <form
            action=""
            className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mt-[50px]"
          >
            <input
              className="outline-none border-b border-gray-400 py-[3px]"
              required
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product title"
            />
            <input
              className="outline-none border-b border-gray-400 py-[3px]"
              type="text"
              onChange={(e) => setShortDesc(e.target.value)}
              required
              placeholder="Short description"
            />
            <input
              className="outline-none border-b border-gray-400 py-[3px]"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Description"
            />
            <input
              className="outline-none border-b border-gray-400 py-[3px]"
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Price"
            />
            <select
              required
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none border-b border-gray-400 py-[3px]"
            >
              <option value="sofa">sofa</option>
              <option value="wireless">wireless</option>
              <option value="chair">chair</option>
              <option value="mobile">mobile</option>
            </select>
            <input
              type="file"
              className="outline-none border-b border-gray-400 py-[3px]"
              placeholder="Product main image"
              onChange={(e) => setMainImg(e.target.files[0])}
            />
            <input
              type="file"
              className="outline-none border-b border-gray-400 py-[3px]"
              placeholder="Product image one"
              onChange={(e) => setImgOne(e.target.files[0])}
            />
            <input
              type="file"
              className="outline-none border-b border-gray-400 py-[3px]"
              placeholder="Product image two"
              onChange={(e) => setImgTwo(e.target.files[0])}
            />
            <input
              type="file"
              className="outline-none border-b border-gray-400 py-[3px]"
              placeholder="Product image three"
              onChange={(e) => setImgThree(e.target.files[0])}
            />
            <input
              type="file"
              className="outline-none border-b border-gray-400 py-[3px]"
              placeholder="Product image four"
              onChange={(e) => setImgFour(e.target.files[0])}
            />
            <div className="flex flex-row gap-[15px] outline-none border-b border-gray-400 py-[3px]">
              <label htmlFor="color-picker" className="text-gray-500 mb-2">
                Choose Color
              </label>
              <input
                id="color-picker"
                type="color"
                value={color || "#000000"}
                onChange={(e) => setColor(e.target.value)}
                required
              />
            </div>
            <select
              required
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="outline-none border-b border-gray-400 py-[3px]"
            >
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
              <option value="xxxl">XXXL</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
            </select>
          </form>
          <button
            onClick={handelUpload}
            className="mt-[50px] bg-[#DB4444] w-full rounded px-6 py-2 font-semibold text-slate-100"
          >
            Add product
          </button>
        </div>
      )}
    </div>
  );
}
