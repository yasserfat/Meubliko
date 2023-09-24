export default function CommenSection({title}) {
  return (
    <div className=" relative h-44 bg-gradient-to-r z-20  ">
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 "></div>
      <div className="  flex justify-center items-center w-full h-full bg-hero-pattern    bg-no-repeat bg-center bg-cover">
        <h1 className="text-white z-50 text-4xl font-poppins font-bold">
          {title}
        </h1>
      </div>
     
    </div>
  );
}
