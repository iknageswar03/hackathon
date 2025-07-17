import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SESSION_DURATION = 8*60 * 60; // 1 hour in seconds

const Dashboard = () => {
  const navigate = useNavigate();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [user,setUser]=useState<any>(null)
  const [isLoading,setIsLoading]=useState(true);

  const getUser=async()=>{
      fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/getuser`,{
    method:'GET',
    headers:{
      'Content-type':'application/json',
    },
    credentials:'include'
  })
  .then((res)=>{
    return res.json()
  })
  .then((response)=>{
    if(response.ok){
      console.log(response.data)
      setUser(response.data)
    }
    else{
      console.log("unauthorized please login")
      navigate("/auth/signin");
    }
  })
  .catch((err)=>{
    console.log(err)
    navigate("/auth/signin");
  }).finally(()=>{
    setIsLoading(false);
  })
  }


  useEffect(() => {
    let startTime = localStorage.getItem("loginStartTime");

    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem("loginStartTime", startTime);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diffInSeconds = Math.floor((now - parseInt(startTime!)) / 1000);
      setElapsedSeconds(diffInSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  useEffect(()=>{
    getUser()
  },[])

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.ok) {
        toast.success("Logged out successfully!");
        localStorage.removeItem("token");
        localStorage.removeItem("loginStartTime"); // 👈 Clear this too

        navigate("/auth/signin");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Something went wrong");
    }
  };

 const formatTimeWithHours = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};


  const timeRemaining = Math.max(0, SESSION_DURATION - elapsedSeconds);

  // Add this near the top of your component (before `useEffect`)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cabinTemp, setCabinTemp] = useState("26°C"); // You can make this dynamic later

  useEffect(() => {
    const clock = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clock);
    }, []);

    const formatCurrentTime = (date: Date) => {
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};


  const cards = [
    { title: "Tasks", emoji: "📝", route: "/tasks" },
    { title: "Machine Analytics", emoji: "🚜", route: "/analytics" },
    { title: "Training Hub", emoji: "🎥", route: "/training" },
    { title: "Incidents", emoji: "🚨", route: "/incidents" },
  ];

  if (isLoading) {
  return <div className="text-white text-center mt-20">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[#111111] text-white">
      {/* Right Sidebar */}
      <div className="w-72 bg-[#1b1b1b] border-l border-yellow-500 p-6 flex flex-col items-center justify-between text-center shadow-lg rounded-l-2xl">
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-yellow-500">Operator Panel</h1>
    <p className="text-gray-400 text-sm">Welcome back, { user?.name }👋</p>

    <div className="text-sm space-y-2 text-white">
      <div>
        ⏱ <span className="text-yellow-400 font-medium">Elapsed:</span> {formatTimeWithHours(elapsedSeconds)}
      </div>
      <div>
        ⏳ <span className="text-yellow-400 font-medium">Remaining:</span> {formatTimeWithHours(timeRemaining)}
      </div>
      <div>
        🌡️ <span className="text-yellow-400 font-medium">Cabin Temp:</span> {cabinTemp}
      </div>
      <div>
        🕒 <span className="text-yellow-400 font-medium">Current Time:</span>{" "}
        {formatCurrentTime(currentTime)}
      </div>
    </div>
  </div>

  <button
    onClick={handleLogout}
    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full text-sm font-semibold mt-6"
  >
    Logout
  </button>
</div>


      {/* Main Dashboard Content */}
      <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-[#1b1b1b] hover:bg-[#2a2a2a] p-6 rounded-xl border border-yellow-500 shadow-lg transition-transform hover:scale-105"
          >
            <div className="text-4xl mb-4">{card.emoji}</div>
            <h2 className="text-xl font-semibold">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
