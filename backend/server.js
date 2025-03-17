const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Contact = require('./models/Contact');
const StudyPlanItem = require('./models/StudyPlanItem');
const { Task, addTask } = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired.' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Invalid token.' });
    }
    res.status(400).json({ msg: 'Invalid token.' });
  }
};

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, username: user.name, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user details
app.get('/api/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.validate();

    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') {
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    res.status(500).json({ message: 'Server error. Try again later.' });
  }
});

// Dashboard data
app.get('/api/dashboard', authMiddleware, async (req, res) => {
  try {
    const studyPlan = await StudyPlanItem.find({ userId: req.user.id }).select('item -_id');
    const tasks = await Task.find({ userId: req.user.id }).select('description completed -_id');

    const studyPlanArray = studyPlan.map(item => item.item);
    const tasksArray = tasks.map(task => ({
      description: task.description,
      completed: task.completed
    }));

    res.json({
      studyPlan: studyPlanArray,
      tasks: tasksArray,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add study plan item
app.post('/api/studyplan', authMiddleware, async (req, res) => {
  try {
    const { item } = req.body;
    const newStudyPlanItem = new StudyPlanItem({ userId: req.user.id, item });
    await newStudyPlanItem.save();
    res.status(201).json(newStudyPlanItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add task
app.post('/api/tasks', authMiddleware, async (req, res) => {
  try {
    const { taskName, description, dueDate } = req.body;
    const userId = req.user.id;

    const newTaskData = { taskName, description, dueDate, userId };
    const savedTask = await addTask(newTaskData);
    
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task', error: error.message });
  }
});

// Get tasks
app.get('/api/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
});

// Delete task
app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Task deletion error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update task details
app.patch("/api/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { taskName, description, dueDate, completed } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { taskName, description, dueDate, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Task update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
