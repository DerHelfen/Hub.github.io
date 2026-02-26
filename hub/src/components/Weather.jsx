import React from "react";
import { Sun } from "lucide-react";

const Weather = () => {
  // Mock weather data
  const weather = {
    temp: 22,
    condition: "Sunny",
    location: "Current Location",
  };

  return (
    <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-sm">
      <Sun className="w-12 h-12 text-amber-400" />
      <div>
        <div className="text-4xl font-bold text-slate-800">
          {weather.temp}°C
        </div>
        <div className="text-slate-500">
          {weather.condition} • {weather.location}
        </div>
      </div>
    </div>
  );
};

export default Weather;
