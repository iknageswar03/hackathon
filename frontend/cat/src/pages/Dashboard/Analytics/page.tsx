import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const getFuelColor = (level: number) => {
  if (level > 50) return 'bg-green-400';
  if (level > 25) return 'bg-yellow-400';
  return 'bg-red-500';
};

const generateRandomHistory = () => {
  const today = new Date();
  const days = [...Array(5)].map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (4 - i));
    return {
      timestamp: d.toISOString().split("T")[0],
      fuelLevel: Math.floor(40 + Math.random() * 40),
      oilTemp: Math.floor(75 + Math.random() * 15),
      runtimeHours: Math.floor(4 + Math.random() * 6),
    };
  });
  return days;
};

const MachineAnalytics = () => {
    const [issues, setIssues] = useState<any>([]);

    
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({
    machineName: "CAT D11 Bulldozer",
    previousOperator: "Raj Kumar",
    issues: [
      "Hydraulic leak detected on 2025-07-14",
      "Engine overheating warning on 2025-07-15",
    ],
    history: generateRandomHistory(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics((prev) => ({
        ...prev,
        history: generateRandomHistory(),
      }));
    }, 10000); // update every 10 seconds

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
  const fetchIssues = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/issues`);
      const data = await res.json();
      console.log(data)
      setIssues(data);
    } catch (err) {
      console.error("Failed to fetch issues", err);
    }
  };

  fetchIssues();
}, []);


  const chartData = {
    labels: analytics.history.map(entry => entry.timestamp),
    datasets: [
      {
        label: "Fuel Level",
        data: analytics.history.map(entry => entry.fuelLevel),
        borderColor: "#facc15",
        backgroundColor: "#facc15",
        tension: 0.4,
      },
      {
        label: "Oil Temperature",
        data: analytics.history.map(entry => entry.oilTemp),
        borderColor: "#f87171",
        backgroundColor: "#f87171",
        tension: 0.4,
      },
    ],
  };

  const latest = analytics.history.slice(-1)[0];

  return (
    <div className="min-h-screen bg-[#111111] text-white p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-yellow-400">📊 Machine Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] p-5 rounded-xl border border-yellow-600 space-y-2">
          <p className="text-lg">
            <span className="font-semibold text-yellow-300">Machine:</span> {analytics.machineName}
          </p>
          <p className="text-sm text-gray-400">
            <span className="text-yellow-300">Previous Operator:</span> {analytics.previousOperator}
          </p>
          <div>
            <h3 className="font-semibold text-yellow-300 mt-4">⚠️ Issues Logged:</h3>
            <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                {issues.map((issue: any, idx: number) => (
                <li key={idx}>{issue.description}   <span className="text-gray-400 text-xs ml-2">
                    ({new Date(issue.createdAt).toLocaleString()})
                 </span>
                </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-5 rounded-xl border border-yellow-600">
          <h3 className="font-semibold text-yellow-300 mb-2">📈 Analytics Graph</h3>
          <div className="w-full h-60">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        <div className="bg-[#222222] p-4 rounded-lg border border-yellow-700">
          <p className="text-yellow-300 font-semibold text-sm">Fuel Level</p>
          <p className="text-2xl font-bold">{latest.fuelLevel}%</p>
          <div className="w-full h-2 bg-gray-700 mt-3 rounded-full">
            <div
              className={`h-full ${getFuelColor(latest.fuelLevel)}`}
              style={{ width: `${latest.fuelLevel}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-[#222222] p-4 rounded-lg border border-red-400">
          <p className="text-red-400 font-semibold text-sm">Oil Temp</p>
          <p className="text-2xl font-bold">{latest.oilTemp}°C</p>
        </div>

        <div className="bg-[#222222] p-4 rounded-lg border border-green-500 col-span-2 md:col-span-1">
          <p className="text-green-400 font-semibold text-sm">Runtime</p>
          <p className="text-2xl font-bold">{latest.runtimeHours} hrs</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 self-start bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full text-sm font-semibold"
      >
        ⬅️ Back to Dashboard
      </button>
    </div>
  );
};

export default MachineAnalytics;
