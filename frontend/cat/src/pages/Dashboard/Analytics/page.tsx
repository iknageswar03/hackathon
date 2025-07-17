import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MachineAnalytics = () => {
  const [machineStats, setMachineStats] = useState({
    engineStatus: "Running",
    fuelLevel: 75,
    oilTemp: 68,
    tirePressure: 32,
    runtimeHours: 340,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // In real app, fetch analytics from backend here
    // Example: fetch(`${import.meta.env.VITE_BACKEND_URL}/machine/analytics`)
  }, []);

  const analyticsCards = [
    {
      label: "Engine Status",
      value: machineStats.engineStatus,
      icon: "🛠️",
    },
    {
      label: "Fuel Level",
      value: `${machineStats.fuelLevel}%`,
      progress: machineStats.fuelLevel,
      icon: "⛽",
    },
    {
      label: "Oil Temperature",
      value: `${machineStats.oilTemp}°C`,
      icon: "🌡️",
    },
    {
      label: "Tire Pressure",
      value: `${machineStats.tirePressure} PSI`,
      icon: "🔧",
    },
    {
      label: "Runtime Hours",
      value: `${machineStats.runtimeHours} hrs`,
      icon: "⏱️",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        🚜 Machine Analytics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsCards.map((card, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] border border-yellow-500 p-6 rounded-xl shadow-lg hover:shadow-yellow-700 transition"
          >
            <div className="text-4xl mb-2">{card.icon}</div>
            <div className="text-sm text-gray-400">{card.label}</div>
            <div className="text-xl font-semibold text-yellow-300">
              {card.value}
            </div>

            {card.progress !== undefined && (
              <div className="w-full h-2 bg-gray-700 mt-3 rounded-full">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${card.progress}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-10 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full text-sm font-semibold"
      >
        ⬅️ Back to Dashboard
      </button>
    </div>
  );
};

export default MachineAnalytics;
