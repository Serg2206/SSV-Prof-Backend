const mongoose = require('mongoose');

const internshipApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: String
  },
  goals: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InternshipApplication', internshipApplicationSchema);
