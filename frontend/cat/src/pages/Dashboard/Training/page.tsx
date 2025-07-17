import React from "react";
import { useNavigate } from "react-router-dom";

const tutorials = [
  {
    title: "Safety Check Tutorial",
    src: "/assets/videos/safety-check.mp4",
    description: "Learn how to perform a basic safety check before operating the machine.",
  },
  {
    title: "Machine Operation Basics",
    src: "/assets/videos/machine-operation.mp4",
    description: "Understand the core controls and functions of the machine.",
  },
  {
    title: "Daily Maintenance Routine",
    src: "/assets/videos/daily-maintenance.mp4",
    description: "Steps for daily maintenance to improve machine longevity.",
  },
  {
  title: "Fuel Management & Efficiency",
  src: "/assets/videos/fuel-management.mp4",
  description: "Tips to optimize fuel usage and reduce operational costs effectively.",
}

];

const TrainingHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-400">🎥 Training Hub</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tutorials.map((video, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] border border-yellow-600 rounded-xl p-4 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
            <p className="text-sm text-gray-400 mb-3">{video.description}</p>
            <video controls className="w-full rounded-lg shadow-md">
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingHub;
