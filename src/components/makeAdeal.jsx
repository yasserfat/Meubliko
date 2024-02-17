import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import { content } from "../assets/data/content";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import realProduct from "../assets/data/RealProducts";
export default function MakeDeal() {
  const { lang } = useSelector((store) => store.cart);
  const form = useRef();
  const parm = useParams();
  const selected = realProduct[lang].find((prd) => prd.id == parm.id);
  const [selectedPrd, setSelectedPrd] = useState(selected);
  useEffect(() => {
    setSelectedPrd(selected);
  }, []);
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_5h4zdvo", "template_g5v52k3", form.current, {
        publicKey: "dAolmyPfFAsMsbsfV",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="p-8">
      <div className=" items-center gap-16 my-6 mx-auto max-w-4xl bg-white text-[#333] font-[sans-serif]">
        <h1 className="mb-7 font-bold text-slate-800 text-2xl text-center">
          Make a deal for {selectedPrd?.productName}
        </h1>

        <form className="ml-auo space-y-4" ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            placeholder={content[lang].contact.id}
            name="id"
            value={selectedPrd.id}
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-slate-700"
          />
          <input
            type="text"
            placeholder={content[lang].contact.Product_name}
            name="Product_name"
            value={selectedPrd.productName}
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-slate-700"
          />
          <input
            type="text"
            placeholder={content[lang].contact.name}
            name="name"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-slate-700"
          />
          <input
            type="email"
            placeholder={content[lang].contact.email}
            name="email"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-slate-700"
          />
          <input
            type="number"
            placeholder={content[lang].contact.number}
            name="number"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-slate-700"
          />

          <textarea
            placeholder={content[lang].contact.message}
            name="Message"
            rows="6"
            className="w-full rounded-md px-4 bg-gray-100 text-sm pt-3 outline-slate-700"
          ></textarea>

          <button
            type=""
            className="text-white bg-slate-700 font-semibold rounded-md text-sm px-4 py-3 w-full"
          >
            {content[lang].contact.send}
          </button>
        </form>
      </div>
    </div>
  );
}
