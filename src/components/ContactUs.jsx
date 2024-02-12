import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("clicked");
    emailjs
      .sendForm("service_5h4zdvo", "template_7iynvtk", form.current, {
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
      <div className="grid sm:grid-cols-2 items-center gap-16 my-6 mx-auto max-w-4xl bg-white text-[#333] font-[sans-serif]">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-700">Let's Talk</h1>
          <p className="text-sm text-gray-400 mt-3">
            Have some big idea or brand to develop and need help? Then reach out
            we'd love to hear about your project and provide help.
          </p>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold  text-slate-700">Email</h2>
            <ul className="mt-3">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <MdOutlineEmail className="text-2xl text-slate-600" />
                </div>
                <a
                  href="javascript:void(0)"
                  className="text-slate-700 text-sm ml-3"
                >
                  <small className="block ">Mail</small>
                  <strong>info@example.com</strong>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold  text-slate-700">Socials</h2>
            <ul className="flex mt-3 space-x-4">
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a
                  href="https://web.facebook.com/Meubliko/?_rdc=1&_rdr"
                  target="blank"
                >
                  <FaFacebook className="text-2xl" />
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <FaInstagram className="text-2xl" />
              </li>
              <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <FaYoutube className="text-2xl" />
              </li>
            </ul>
          </div>
        </div>
        <form className="ml-auo space-y-4" ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-slate-700"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-slate-700"
          />
          <input
            type="text"
            placeholder="Subject"
            name="Subject"
            className="w-full rounded-md py-3 px-4 bg-gray-100 text-sm outline-slate-700"
          />
          <textarea
            placeholder="Message"
            name="Message"
            rows="6"
            className="w-full rounded-md px-4 bg-gray-100 text-sm pt-3 outline-slate-700"
          ></textarea>
          <button
            type=""
            className="text-white bg-slate-700 font-semibold rounded-md text-sm px-4 py-3 w-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
