import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();
      if (response.ok) {
        console.log("Fetched tasks:", response.tasks);
        setTasks(response.tasks); // tasks will contain _id
      } else {
        console.error("Error fetching tasks:", response);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const toggleTask = async (_id: string) => {
    const taskToUpdate = tasks.find((task) => task._id === _id);
    if (!taskToUpdate) return;

    const updatedStatus = !taskToUpdate.completed;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${_id}`, {
        method: "PUT", // Or PATCH, depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: updatedStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === _id ? { ...task, completed: updatedStatus } : task
          )
        );
      } else {
        console.error("Failed to update task:", data.message);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">📝 Daily Tasks</h1>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks assigned today.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                task.completed
                  ? "border-green-500 bg-[#1e1e1e]"
                  : "border-yellow-500 bg-[#1b1b1b]"
              } transition duration-200`}
            >
              <span
                className={`text-lg ${
                  task.completed ? "line-through text-green-400" : ""
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => toggleTask(task._id)}
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  task.completed
                    ? "bg-green-500 text-black"
                    : "bg-yellow-500 text-black hover:bg-yellow-600"
                }`}
              >
                {task.completed ? "Completed" : "Mark Done"}
              </button>
            </div>
          ))
        )}
      </div>

      <button
        className="mt-10 px-6 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-600"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default Tasks;
