import { useSelector } from "react-redux";
import featuresData from "../assets/data/serviceData";
import { GrDeliver } from "react-icons/gr";

export default function Services() {
  const {lang} = useSelector(store=> store.cart)
  return (
    <div className=" py-8">
      <div className="container gap-4  m-auto grid items-center grid-cols-1 sm:grid-cols-3  justify-items-center">
        {featuresData[lang].map((item, i) => (
          <div
            style={{ backgroundColor: item.bg }}
            className="p-4 rounded w-full flex justify-center items-center flex-col"
            key={i}
          >
            <img className="w-16" src={item.img} alt="" />
            <div>
              <h1 className="font-bold text-xl mb-2 text-center text-slate-900">
                {item.title}
              </h1>

              <p className="text-gray-700">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
