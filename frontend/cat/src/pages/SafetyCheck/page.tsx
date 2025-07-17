import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultChecklist = [
  { id: 1, item: "Check engine oil level", checked: false },
  { id: 2, item: "Inspect hydraulic system for leaks", checked: false },
  { id: 3, item: "Ensure brakes are functioning properly", checked: false },
  { id: 4, item: "Test horn and backup alarm", checked: false },
  { id: 5, item: "Check lights and indicators", checked: false },
  { id: 6, item: "Inspect tires/tracks for damage", checked: false },
  { id: 7, item: "Ensure seatbelt is operational", checked: false },
];

const SafetyCheck = () => {
  const nav = useNavigate();
  const [checklist, setChecklist] = useState(defaultChecklist);
  const [remarks, setRemarks] = useState("");

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSubmit = () => {
    const report = {
      checklist,
      remarks,
      submittedAt: new Date().toISOString(),
    };

    console.log("Safety Check Report:", report); // Replace with POST API
    toast.success("Safety check submitted successfully!");
    setRemarks("");
    nav("/dashboard");
  };

  const allChecked = checklist.every((item) => item.checked); // 🔑 Outside of submit

  return (
    <div className="min-h-screen bg-[#111111] text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-[#1b1b1b] border border-yellow-500 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          🦺 Operator Safety Checklist
        </h1>

        <ul className="space-y-4 mb-6">
          {checklist.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border-b border-gray-700 pb-2"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="w-5 h-5 accent-yellow-500"
                />
                <span>{item.item}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="mb-6">
          <label className="block mb-2 text-yellow-500 font-semibold">
            📝 Remarks (optional)
          </label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full p-3 rounded bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:border-yellow-500"
            rows={4}
            placeholder="Any observations or issues..."
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allChecked}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition 
            ${allChecked ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-gray-600 text-gray-300 cursor-not-allowed"}`}
        >
          Submit Safety Check
        </button>
      </div>
    </div>
  );
};


export default SafetyCheck;
