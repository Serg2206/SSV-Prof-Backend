const mongoose = require('mongoose');

const libraryMaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['monograph', 'review', 'lecture']
  },
  filePath: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  uploadedBy: {
    type: String
  }
});

module.exports = mongoose.model('LibraryMaterial', libraryMaterialSchema);
