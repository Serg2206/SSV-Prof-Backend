const express = require('express');
const router = express.Router();
const LibraryMaterial = require('../models/LibraryMaterial');
const multer = require('multer');
const authenticateToken = require('../middleware/auth');
const { validateLibraryMaterial } = require('../middleware/validate');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// @route   GET /api/library
// @desc    Get all library materials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const materials = await LibraryMaterial.find().sort({ uploadedAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/library
// @desc    Upload new library material
// @access Private (authenticated users only)router.post('/', authenticateToken, validateLibraryMaterial, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const material = new LibraryMaterial({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      category: req.body.category,
      filePath: req.file.path, // Store the file path from multer
      uploadedBy: req.body.uploadedBy
    });

    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
