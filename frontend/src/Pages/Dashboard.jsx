import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [studyPlan, setStudyPlan] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch study plan and tasks from backend
    axios.get("/api/dashboard").then((response) => {
      setStudyPlan(response.data.studyPlan);
      setTasks(response.data.tasks);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold">Personalized Study Plan</h2>
          <ul className="list-disc ml-6">
            {studyPlan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
          <ul className="list-disc ml-6">
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;