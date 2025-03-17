import React, { Component, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    taskName: "",
    description: "",
    dueDate: "",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const BASE_URL = "http://localhost:5000/api";
  const token = localStorage.getItem("authToken");

  // Chatbot-specific state
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userQuery, setUserQuery] = useState("");

  // Hardcoded Gemini API endpoint using gemini-1.5-pro
  const geminiEndpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=AIzaSyDruYzUgZ2ZshSC-6Fr2aPKYtV6CnChqZY";

  useEffect(() => {
    if (!token) {
      toast.error("No token found. Please log in.", { theme: "dark" });
      return;
    }
    fetchUserDetails();
    fetchTasks();
  }, [token]);

  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length;
    setCompletedTasks(completed);
    setPendingTasks(tasks.length - completed);
  }, [tasks]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      toast.error("Failed to load user details.", { theme: "dark" });
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err) {
      toast.error("Failed to load tasks.", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDueDate = new Date(newTask.dueDate);
    selectedDueDate.setHours(0, 0, 0, 0);
    if (selectedDueDate < today) {
      toast.error("Due date cannot be in the past.", { theme: "dark" });
      return;
    }
    try {
      const taskData = { ...newTask, completed: false };
      const response = await axios.post(`${BASE_URL}/tasks`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks((prev) => [...prev, response.data]);
      setNewTask({ taskName: "", description: "", dueDate: "" });
      toast.success("Task added successfully!", { theme: "dark" });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add task.",
        { theme: "dark" }
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully!", { theme: "dark" });
    } catch (err) {
      toast.error("Failed to delete task.", { theme: "dark" });
    }
  };

  const handleToggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find((task) => task._id === taskId);
      if (!task) return;
      const updatedTask = { ...task, completed: !task.completed };
      const response = await axios.patch(
        `${BASE_URL}/tasks/${taskId}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(tasks.map((t) => (t._id === taskId ? response.data : t)));
      toast.success(
        `Task marked as ${updatedTask.completed ? "completed" : "incomplete"}!`,
        { theme: "dark" }
      );
    } catch (err) {
      toast.error("Failed to update task.", { theme: "dark" });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleSendMessage = async () => {
    if (!userQuery.trim()) return;
    const newUserMessage = { sender: "user", text: userQuery };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserQuery("");
    try {
      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: userQuery }],
          },
        ],
      };
      const response = await axios.post(geminiEndpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });
      let botResponse = "";
      const candidates = response.data.candidates;
      if (Array.isArray(candidates) && candidates.length > 0) {
        const firstCandidate = candidates[0];
        if (
          firstCandidate.content &&
          firstCandidate.content.parts &&
          Array.isArray(firstCandidate.content.parts) &&
          firstCandidate.content.parts.length > 0
        ) {
          botResponse = firstCandidate.content.parts[0].text;
        }
      }
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse || "No response received." },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error.response ? error.response.data : error);
      let errorMessage = "Sorry, I couldn't understand that.";
      if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = `API Error: ${error.response.data.error.message}`;
      }
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMessage },
      ]);
    }
  };

  return (
    <main className="pt-[6.5rem] min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <ToastContainer />
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="px-4 pt-20 flex flex-col items-center justify-center min-h-[calc(100vh-6.5rem)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 z-0">
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-7xl mx-auto space-y-8 sm:space-y-12 relative z-10 py-8 sm:py-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 leading-tight">
            Welcome back, {user?.name || "Guest"}!
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-4xl mx-auto px-4 sm:px-6">
            Organize your study plan efficiently.
          </p>
        </motion.div>
      </motion.div>

      {/* Chatbot Window */}
      <div
        className={`fixed bottom-4 right-4 w-full sm:w-96 bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isChatbotOpen ? "h-96 sm:h-96" : "h-12"
        }`}
      >
        {/* Chatbot Header */}
        <div
          className="bg-gray-800 p-3 flex justify-between items-center cursor-pointer"
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        >
          <span className="text-white font-semibold">Chatbot</span>
          <button className="text-white">{isChatbotOpen ? "Minimize" : "Expand"}</button>
        </div>
        {isChatbotOpen && (
          <>
            {/* Chat Messages Area */}
            <div className="p-4 flex-1 overflow-y-auto max-h-[20rem] sm:max-h-[30rem]">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.sender === "user" ? "bg-cyan-500 text-white" : "bg-gray-700 text-white"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            {/* Chat Input Area */}
            <div className="p-4 border-t border-gray-700 flex gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
              />
              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all duration-300"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>

      {/* Rest of the Dashboard */}
      <div className="flex flex-col items-center space-y-8 sm:space-y-12 px-4">
        {/* Add New Task Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-6 sm:py-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 w-full max-w-md space-y-6 sm:space-y-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white text-center">
            Add a New Task
          </h2>
          <form onSubmit={handleAddTask} className="space-y-6 sm:space-y-8 flex flex-col items-center">
            <div className="flex flex-col w-full">
              <label className="block text-gray-300 text-sm sm:text-base mb-2 ml-8 text-left translate-x-8">
                Task Title
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTask.taskName}
                  onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                  className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
                  required
                />
              </div>
            </div><br/>
            <div className="flex flex-col w-full">
              <label className="block text-gray-300 text-sm sm:text-base mb-2 ml-8 text-left translate-x-8">
                Description
              </label>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
                  required
                />
              </div><br/>
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-gray-300 text-sm sm:text-base mb-2 ml-8 text-left translate-x-8">
                Due Date
              </label>
              <div className="flex justify-center">
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
                  required
                />
              </div>
            </div><br/>
            <button
              type="submit"
              className="w-full max-w-sm px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm sm:text-base rounded-full hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50"
            >
              Add Task
            </button>
          </form>
        </motion.section>

        {/* Task List Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-6 sm:py-8 bg-gray-900/50 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 w-full max-w-md space-y-6 sm:space-y-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">
            Your Tasks
          </h2><br/>
          <div className="flex justify-center space-x-4 mb-6">
            <p className="text-green-500">Completed: {completedTasks}</p>
            <p className="text-yellow-500">Pending: {pendingTasks}</p>
          </div>
          {loading ? (
            <p className="text-gray-400">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-400">No tasks found. Add one!</p>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {tasks.map((task) => (
                <motion.div key={task._id} className="flex flex-col items-start space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{task.taskName}</h3><br/>
                  <p className="text-gray-400">{task.description}</p><br/>
                  <p className="text-gray-400">{formatDate(task.dueDate)}</p><br/>
                  <div className="flex gap-4 justify-center w-full">
                    <button
                      onClick={() => handleToggleTaskCompletion(task._id)}
                      className={`w-full sm:w-1/2 px-6 py-3 ${
                        task.completed ? "bg-yellow-500" : "bg-green-500"
                      } text-white rounded-full text-sm sm:text-base leading-relaxed hover:${
                        task.completed ? "bg-yellow-600" : "bg-green-600"
                      } hover:scale-105 hover:shadow-cyan-500/50 transition-all duration-300`}
                    >
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="w-full sm:w-1/2 px-6 py-3 bg-red-500 text-white rounded-full text-sm sm:text-base leading-relaxed hover:bg-red-600 hover:scale-105 hover:shadow-cyan-500/50 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
}

// ErrorBoundary component to catch errors in Dashboard
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          <h1>Something went wrong:</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function DashboardWithBoundary() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}