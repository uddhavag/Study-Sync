const mongoose = require('mongoose');

const studyPlanItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('StudyPlanItem', studyPlanItemSchema);