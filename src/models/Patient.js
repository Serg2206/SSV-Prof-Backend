const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  // Personal Information
  patientId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  
  // Clinical Data
  medicalHistory: [{
    condition: String,
    diagnosisDate: Date,
    notes: String
  }],
  
  surgeryData: {
    surgeryType: String,
    surgeryDate: Date,
    complications: [String],
    outcome: String
  },
  
  // SSV Analysis Data
  ssvMeasurements: [{
    measurementDate: Date,
    ssvValue: Number,
    notes: String,
    analyzedBy: String
  }],
  
  // ML Predictions
  mlPredictions: [{
    predictionDate: Date,
    modelVersion: String,
    riskScore: Number,
    predictedOutcome: String,
    confidence: Number
  }],
  
  // Metadata
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  },
  createdBy: {
    type: String,
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for performance
patientSchema.index({ patientId: 1 });
patientSchema.index({ lastName: 1, firstName: 1 });
patientSchema.index({ 'surgeryData.surgeryDate': 1 });

// Virtual for full name
patientSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Patient', patientSchema);
