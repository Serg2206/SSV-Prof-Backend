const express = require('express');
const router = express.Router();
const InternshipApplication = require('../models/InternshipApplication');

// @route   POST /api/internship
// @desc    Submit internship application
// @access  Public
router.post('/', async (req, res) => {
  try {
    const application = new InternshipApplication(req.body);
    const newApplication = await application.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
