import { useEffect, useState } from "react";

export default function Counter() {
  const [dateCounter, setDateCounter] = useState({
    days: 0,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  });
  let interval;
  const calculateDate = () => {
    const destination = new Date("7 Mar,2024").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const deffrent = destination - now;
      const days = Math.floor(deffrent / (1000 * 60 * 60 * 24));
      const Hours = Math.floor(
        (deffrent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minute = Math.floor((deffrent % (1000 * 60 * 60)) / (1000 * 60));
      const Seconds = Math.floor((deffrent % (1000 * 60)) / 1000);

      if (destination < 0) clearInterval(interval.current);
      else {
        setDateCounter({
          days: days,
          Hours: Hours,
          Minutes: minute,
          Seconds: Seconds,
        });
      }
    });
  };
  useEffect(() => {
    calculateDate();
  }, []);
  return (
    <div className="bg-sky_blue flex items-center justify-center gap-6 text-slate-700 p-2 ">
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-center justify-end">
          <h1 className="font-bold text-2xl shadow-slate-700 ">
            {dateCounter.days}
          </h1>
          <p className=" font-bold text-lg shadow-slate-700">Days</p>
        </div>
        <span className="font-bold text-xl ">:</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col items-center justify-end">
          <h1 className="font-bold text-2xl shadow-slate-700  ">
            {" "}
            {dateCounter.Hours}
          </h1>
          <p className="  font-bold text-lg shadow-slate-700">Hours</p>
        </div>
        <span className="font-bold text-xl ">:</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col items-center justify-end">
          <h1 className="font-bold text-2xl shadow-slate-700  ">
            {" "}
            {dateCounter.Minutes}
          </h1>
          <p className=" font-bold text-lg shadow-slate-700">Minutes</p>
        </div>
        <span className="font-bold text-xl ">:</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col items-center justify-end">
          <h1 className="font-bold text-2xl shadow-slate-700  ">
            {" "}
            {dateCounter.Seconds}
          </h1>
          <p className=" font-bold text-lg shadow-slate-700 ">Seconds</p>
        </div>
      </div>
    </div>
  );
}
