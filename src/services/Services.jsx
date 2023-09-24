import serviceData from "../assets/data/serviceData";

export default function Services() {
  return (
    <div className=" py-8">
      <div className="container gap-4  m-auto grid items-center grid-cols-1 sm:grid-cols-3  justify-items-center">
        {serviceData.map((item, i) => (
          <div
            style={{ backgroundColor: item.bg }}
            className="p-4 rounded w-full flex justify-center"
            key={i}
          >
            {/* <img className="w-12" src={item.img} alt="" /> */}
            <div>
              <h1 className="text-bold text-lg text-slate-900">{item.title}</h1>
              
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
