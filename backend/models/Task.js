const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

async function addTask(taskData) {
  try {
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    return savedTask;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

async function deleteTask(taskId) {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return deletedTask;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

async function updateTaskStatus(taskId, completed) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    );
    return updatedTask;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
}

module.exports = {
  Task,
  addTask,
  deleteTask,
  updateTaskStatus,
};
