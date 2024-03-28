import { useEffect, useState } from "react";

export default function Counter() {
  const [dateCounter, setDateCounter] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  let interval;
  const calculateDate = () => {
    const destination = new Date("7 Mar,2024").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = destination - now;
      const days = Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0);
      const hours = Math.max(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        0
      );
      const minutes = Math.max(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        0
      );
      const seconds = Math.max(
        Math.floor((difference % (1000 * 60)) / 1000),
        0
      );

      if (difference < 0) clearInterval(interval);
      else {
        setDateCounter({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        });
      }
    });
  };
  useEffect(() => {
    calculateDate();
    return () => clearInterval(interval);
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
            {dateCounter.hours}
          </h1>
          <p className="  font-bold text-lg shadow-slate-700">Hours</p>
        </div>
        <span className="font-bold text-xl ">:</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col items-center justify-end">
          <h1 className="font-bold text-2xl shadow-slate-700  ">
            {" "}
            {dateCounter.minutes}
          </h1>
          <p className=" font-bold text-lg shadow-slate-700">Minutes</p>
        </div>
        <span className="font-bold text-xl ">:</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col items-center justify-end">
          <h1 className="font-bold text-2xl shadow-slate-700  ">
            {" "}
            {dateCounter.seconds}
          </h1>
          <p className=" font-bold text-lg shadow-slate-700 ">Seconds</p>
        </div>
      </div>
    </div>
  );
}
