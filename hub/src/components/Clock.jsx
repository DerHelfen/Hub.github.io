import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-sm">
      <div className="text-5xl font-light tracking-tight text-slate-800">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="text-sm uppercase tracking-widest text-slate-500 mt-2">
        {time.toLocaleDateString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default Clock;
