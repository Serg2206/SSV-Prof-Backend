const express = require('express');
const router = express.Router();

// Mock internship data
const internships = [
  {
    id: 1,
    title: 'Стажировка в отделении нейрохирургии',
    department: 'Нейрохирургия',
    duration: '6 месяцев',
    startDate: '2025-02-01',
    requirements: 'Высшее медицинское образование',
    status: 'open'
  },
  {
    id: 2,
    title: 'Spinal Surgery Research Internship',
    department: 'Surgical Research',
    duration: '3 months',
    startDate: '2025-03-15',
    requirements: 'Medical degree, research experience',
    status: 'open'
  },
  {
    id: 3,
    title: 'Клиническая ординатура',
    department: 'Хирургия',
    duration: '2 года',
    startDate: '2025-09-01',
    requirements: 'Диплом врача',
    status: 'upcoming'
  }
];

// @route   GET /api/internship
// @desc    Get all internships
// @access  Public
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   GET /api/internship/:id
// @desc    Get single internship
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const internship = internships.find(i => i.id === parseInt(req.params.id));
    
    if (!internship) {
      return res.status(404).json({
        success: false,
        error: 'Internship not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: internship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   POST /api/internship/:id/apply
// @desc    Apply for internship
// @access  Public (should be protected in production)
router.post('/:id/apply', (req, res) => {
  try {
    const internship = internships.find(i => i.id === parseInt(req.params.id));
    
    if (!internship) {
      return res.status(404).json({
        success: false,
        error: 'Internship not found'
      });
    }
    
    if (internship.status !== 'open') {
      return res.status(400).json({
        success: false,
        error: 'This internship is not accepting applications'
      });
    }
    
    // In production, save application to database
    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        internshipId: internship.id,
        applicantData: req.body
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
