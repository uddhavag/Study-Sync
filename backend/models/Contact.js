// contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // More descriptive error message
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^\S+@\S+\.\S+$/,
      "Please enter a valid email address", // Improved error message
    ],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    minlength: [10, "Message must be at least 10 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // Add timestamps option for createdAt and updatedAt

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;