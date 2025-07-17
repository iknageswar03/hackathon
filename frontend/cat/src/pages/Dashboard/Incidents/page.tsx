import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // 👈 Add this

const Incidents = () => {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // 👈 Initialize router navigation

  const machineName = "CAT D11 Bulldozer";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) {
      toast.error("Please enter a description");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/issues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ description }),
      });

      const data = await res.json();
      if (data.ok) {
        toast.success("Incident reported successfully!");
        setDescription("");
        setTimeout(() => {
          navigate("/dashboard"); // 👈 Go back to dashboard after success
        }, 2000); // small delay to show the toast
      } else {
        toast.error(data.message || "Failed to report incident");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] p-8 rounded-lg border border-yellow-500 space-y-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-yellow-400 text-center">🚨 Report Incident</h1>

        <div>
          <label className="block text-sm font-medium text-yellow-300 mb-1">Machine Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-[#2a2a2a] text-white border border-gray-600"
            value={machineName}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-300 mb-1">Issue Description</label>
          <textarea
            className="w-full px-4 py-2 rounded bg-[#2a2a2a] text-white border border-gray-600"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full w-full font-semibold"
        >
          {isSubmitting ? "Reporting..." : "Report Issue"}
        </button>

        {/* 🔙 Back Button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-2 border border-yellow-500 text-yellow-400 hover:bg-yellow-700 hover:text-black px-6 py-2 rounded-full w-full font-semibold"
        >
          ← Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default Incidents;
