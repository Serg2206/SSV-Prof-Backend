const express = require('express');
const router = express.Router();
const ConsultationRequest = require('../models/ConsultationRequest');

// @route   POST /api/consultation
// @desc    Submit consultation request
// @access  Public
router.post('/', async (req, res) => {
  try {
    const request = new ConsultationRequest(req.body);
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
